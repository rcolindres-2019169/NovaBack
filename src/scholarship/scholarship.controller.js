'use strict'

import Scholarship from './scholarship.model.js'

export const save = async (req,res) =>{
    try{
        let data = req.body
        let scholarship = new Scholarship(data)
        await scholarship.save()
        return res.status(200).send({message:'Scholarship saved successfully',data:scholarship})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error regirstering scholarship', err:err})
    }
}

export const getS = async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        if (scholarships.length === 0) {
            return res.status(404).send({ message: 'There are no scholarships' });
        }
        return res.status(200).send({ message: 'Scholarships retrieved successfully', data: scholarships });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting scholarships', err: err });
    }
};

export const update = async(req,res)=>{
    try{
        let {id} = req.params.id
        let data = req.body
        if(Object.keys(data).length === 0) return res.status(401).send({ message: 'Update is empty, not updated' })

        let updatedScholarship = await Video.findByIdAndUpdate(
            {_id:id}, 
            data, 
            {new: true})
        if(!updatedScholarship) return res.status(401).send({ message: 'Scholarship  not found and not updated' })
            return res.send({ message: 'Updated Scholarship', updatedScholarship })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error regirstering Scholarship', err:err})
    }
}

export const deleteS = async(req, res) =>{
    try {
        let {id} = req.params.id
        let deletedScholarship = await Scholarship.findOneAndDelete({_id: id})
        if(!deletedScholarship) return res.status(404).send({message: 'Scholarship not found and not deleted'})
            return res.send({message: `Scholarship with name ${deletedScholarship.name} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting Scholarship'})
    }
}