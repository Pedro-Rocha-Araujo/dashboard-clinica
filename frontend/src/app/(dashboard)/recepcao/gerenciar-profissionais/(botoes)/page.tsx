import { redirect } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import Cookies from "js-cookie"

interface BotoesProps {
  id: string,
  cadastrado: boolean
}

export default function Botoes({ id, cadastrado }: BotoesProps) {

  async function desativarProfissional(id: string) {
    try {
      const token = Cookies.get("token")
      await axios.patch(
        `http://localhost:4000/profissional/${id}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } 
      )
      toast.success("Profissional desativado.")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro ao desativar profissional.")
    }
  }
  
  return (
    <div className="botoes">
      { cadastrado === false && (
        <i 
          onClick={()=>redirect("/recepcao/cadastrar-profissional/"+id)} 
          className="fa-solid fa-clipboard fa-lg"
        ></i>
      ) }

      <i 
        onClick={()=>desativarProfissional(id)}
        className="fa-solid fa-circle-xmark fa-lg"
      ></i>
    </div>
  )
} 