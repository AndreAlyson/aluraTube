import React from 'react';
import { StyledRegisterVideo } from './styles';
import { createClient } from '@supabase/supabase-js';


function useForm(propsDoForm) {
  const [values, setValues] = React.useState( propsDoForm.initialValues );

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name
      setValues({
      ...values,
      [name]: value,
  });
  },
  clearForm() {
    setValues({})
  }
  };
}
const PROJECT_URL = 'https://gqaknoffudxsvldlbwic.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYWtub2ZmdWR4c3ZsZGxid2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEzMDQzMDUsImV4cCI6MTk5Njg4MDMwNX0.IWyUQWCKBP1PsfM_Bc-XjY7rYlmcWRGMbbs7zHwn2wo';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return url.replace('https://www.youtube.com/watch?v=', 'https://i.ytimg.com/vi/');
}

export default function RegisterVideo() {
  const formCadastro = useForm({ 
    initialValues: { titulo: "ps1co short", url: "https://www.youtube.com/watch?v=jwwtWfHmt3E" } 
  });
  const [formVisivel, setFormVisivel] = React.useState(false);
  return (
    <StyledRegisterVideo>
      <button className='add-video' onClick={() => setFormVisivel(true)}>
        +
      </button>
    {formVisivel 
        ? (
          <form onSubmit={(evento) => {
            evento.preventDefault(); //prevenir a atualização padrão
            console.log(formCadastro.values);

            //contrato entre o nosso front e o Backend
            supabase.from("video").insert({
              title: formCadastro.values.titulo,
              url: formCadastro.values.url,
              thumb: getThumbnail(formCadastro.values.url),
              playlist: "jogos",
            })
            .then((oqueveio) => {
              console.log(oqueveio);
            })
            .catch((err) => {
              console.log(err);
            })

            setFormVisivel(false);
            formCadastro.clearForm();
          }}>
          <div>
            <button type='button' className='close-modal' onClick={() => setFormVisivel(false)}>
              X
            </button>
            <input placeholder='Titulo do vídeo'
              name='titulo' 
              value={formCadastro.values.titulo} 
              onChange={formCadastro.handleChange} 
              />
            <input 
              placeholder='URL'
              name='url'
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange} 
            />
            <button type='submit' >
              Cadastrar
            </button>
          </div>
        </form>  

    )
       : false}

    </StyledRegisterVideo>
  )
}