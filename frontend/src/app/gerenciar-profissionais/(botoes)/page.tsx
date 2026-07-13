import { redirect } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"

interface BotoesProps {
  id: string
}

export default function Botoes({ id }: BotoesProps) {

  async function desativarProfissional(id: string) {
    try {
      await axios.patch(`http://localhost:4000/profissional/${id}`)
      toast.success("Profissional desativado.")
      
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao desativar profissional.")
    }
  }
  
  return (
    <div className="botoes">
      <i 
        onClick={()=>redirect("/editar-profissional/"+id)} 
        className="fa-solid fa-pen-to-square fa-lg"
      ></i>

      <i 
        onClick={()=>desativarProfissional(id)}
        className="fa-solid fa-circle-xmark fa-lg"
      ></i>
    </div>
  )
} 