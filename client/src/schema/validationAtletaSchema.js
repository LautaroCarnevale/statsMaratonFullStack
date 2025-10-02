import * as yup from 'yup';

export const validationAtletaSchema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    dni: yup.string().required('El DNI es obligatorio').matches(/^\d+$/, 'El DNI debe contener solo números').min(8, 'El DNI debe tener al menos 8 dígitos').max(8, 'El DNI no puede tener más de 8 dígitos'),
    ciudadId: yup.string().required('La ciudad es obligatoria'),
    posicion: yup.number().typeError('La posición debe ser un número').required('La posición es obligatoria').min(1, 'La posición debe ser al menos 1'),
    tiempo: yup.string().required('El tiempo es obligatorio').matches(/^\d{1,2}:\d{2}:\d{2}$/, 'El tiempo debe tener el formato HH:MM:SS'),
});