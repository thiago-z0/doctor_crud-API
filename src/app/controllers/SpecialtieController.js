import * as Yup from 'yup';
import Specialtie from '../models/Specialtie';

class DoctorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      specialtie_name: Yup.string().required(),
    })


    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'});
    }

    const name = req.body.specialtie_name;

    const SpecialtieExists = await Specialtie.findOne({ where: { specialtie_name : name } });

    if(SpecialtieExists){
      return res.status(400).json({error: 'Specialtie already exists.'});
    }

    const link = await Specialtie.create(req.body);

    return res.json(link);
  }

  async index (req,res) {
    const all = await Specialtie.findAll({attributes: ['specialtie_name', 'id']});
    return res.json(all);
  }

};


export default new DoctorController;
