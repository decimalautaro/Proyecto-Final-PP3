import { Autocomplete, TextField } from "@mui/material";

const SeleccionarMateria = () => {
    const materias = [
        {title: 'Arquitectura de interfaces'},
        {title: 'Bases de datos II'},
        {title: 'Etica profesional'},
        {title: 'Gestión de proyectos'},
        {title: 'Practica profesionalizante III'},
        {title: 'Probabilidad y estadística'},
        {title: 'Programación III'},
        {title: 'Seguridad Informática'},
    ];
    return(
        <Autocomplete
        options={materias}
        getOptionLabel={(option) => option.title}
        id="select-on-focus"
        selectOnFocus
        renderInput={(params) => <TextField {...params} label="Materias" margin="normal" />}
      />
    )
}
export default SeleccionarMateria;
