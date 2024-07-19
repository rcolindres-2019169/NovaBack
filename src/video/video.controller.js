'use strict'

import Video from './video.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body;
        let video = new Video(data);
        await video.save();
        return res.status(200).send({ message: 'Video saved successfully', data: video });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering video', err: err });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        // Verificar si los datos para actualizar están vacíos
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ message: 'Update data is empty, not updated' });
        }

        // Actualizar el video
        const updatedVideo = await Video.findByIdAndUpdate(id, data, { new: true });

        // Verificar si se encontró y actualizó el video
        if (!updatedVideo) {
            return res.status(404).send({ message: 'Video not found and not updated' });
        }

        return res.send({ message: 'Updated video', updatedVideo });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating video', err });
    }
};

export const deleteA = async (req, res) => {
    try {
        // Obtener el ID del parámetro de la URL
        const id = req.params.id;

        // Eliminar el video basado en el ID
        const deletedVideo = await Video.findOneAndDelete({ _id: id });

        // Verificar si se encontró y eliminó el video
        if (!deletedVideo) {
            return res.status(404).send({ message: 'Video not found and not deleted' });
        }

        return res.send({ message: `Video with name ${deletedVideo.name} deleted successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting video', err });
    }
};

export const get = async(req,res )=>{
    try{
        let videos = await Video.find()
        if(!videos) return res.status(404).send({ message: 'There are no video' })
            return res.send({ videos })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting video', err:err})
    }
}

export const search = async(req,res)=>{
    try{
        const {search} = req.body
        const videos = await Video.find({name: { $regex: new RegExp(search, 'i') } })

        if (videos.length === 0){
            return res.status(404).send({ message: 'Videos not found' });
        } 
        res.send({ message: 'Videos found', videos });
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching video', err:err})
    }
}