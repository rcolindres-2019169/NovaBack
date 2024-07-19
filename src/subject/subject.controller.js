import Subject from '../subject/subject.model.js'; // Ajusta la ruta según la ubicación de tu modelo

export const addSubject = async (req, res) => {
    try {
        const { nombre,  recursosId, userId, estado } = req.body;
        if (!nombre || !userId) {
            return res.status(400).send({ message: 'Nombre y userId son requeridos' });
        }
        const newSubject = new Subject({
            nombre,
            recursosId,
            userId,
            estado
        });

        // Guardar la materia en la base de datos
        const savedSubject = await newSubject.save();
        return res.send({ message: 'Materia agregada exitosamente', subject: savedSubject });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al agregar la materia', error: err.message });
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar la materia
        const deletedSubject = await Subject.findOneAndDelete({ _id: id });

        if (!deletedSubject) {
            return res.status(404).send({ message: 'Materia no encontrada y no eliminada' });
        }

        return res.send({ message: `Materia con nombre ${deletedSubject.nombre} eliminada exitosamente` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar la materia', error: err.message });
    }
};

export const get = async(req,res )=>{
    try{
        let subjects = await Subject.find()
        if(!subjects) return res.status(404).send({ message: 'There are no subject' })
            return res.send({ subjects })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting subjects', err:err})
    }
}