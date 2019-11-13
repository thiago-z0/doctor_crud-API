import * as Yup from 'yup';
import Doctor from '../models/Doctor';
import Specialtie from '../models/Specialtie';
import Doctor_specialties from '../models/Doctor_specialties';

class DoctorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      phone: Yup.number().required(),
      state: Yup.string(),
      city: Yup.string(),
      specialties: Yup.array().required(),
    })


    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }


    const DoctorExists = await Doctor.findOne({ where: { crm : req.body.crm } });

    if(DoctorExists){
      return res.status(400).json({error: 'Doctor already exists.'});
    }

    const { specialties, ...data } = req.body;

    const post = await Doctor.create(data);


      const map = specialties.map(async function(u_id) {
        const specialtie = await Specialtie.findOne({where: {id:u_id}});
        const doctor  = await Doctor.findOne({ where: { crm : req.body.crm } });
        await Doctor_specialties.destroy({where:{doctor_id:doctor.id}});
        await Doctor_specialties.create({
          doctor_id: doctor.id,
          specialtie_id: specialtie.id,
        });
      });

      const { name, crm, phone, state, city } = req.body;



      return res.json({
        name,
        crm,
        phone,
        state,
        city
      });
  }

  async index (req,res) {
    const doctor = await Doctor.findAll({
      attributes: ['name', 'crm', 'phone', 'state', 'city',],
      include: [
        {
          all: true
        }
      ]
    });
    return res.json(doctor);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      crm: Yup.string(),
      phone: Yup.number(),
      state: Yup.string(),
      city: Yup.string(),
      especialties: Yup.string(),
    })


    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor){
      return res.status(400).json({ error: 'Doctor does not exists'});
    }

    const { name, crm, phone, state, city } = await doctor.update(req.body);

    const specialties = req.body.specialties;

    specialties.map(async function(u_id) {
      const specialtie = await Specialtie.findOne({where: {id:u_id}});
      const doctor  = await Doctor.findOne({ where: { crm : req.body.crm } });
      await Doctor_specialties.destroy({where:{doctor_id:doctor.id}});
      await Doctor_specialties.create({
        doctor: doctor.id,
        specialtie: specialtie.id,
      });
    });

    return res.json({
      name,
      crm,
      phone,
      state,
      city
    });
  }


  async delete(req, res) {

    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor){
      return res.status(400).json({ error: 'Doctor does not exists'});
    }else {
      await doctor.destroy(req.body);
      return res.json({message: "Doctor successfully deleted!"});
    }
  }
};


export default new DoctorController;
