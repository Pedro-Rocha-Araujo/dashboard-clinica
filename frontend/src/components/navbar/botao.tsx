'use client'

interface BotaoProps {
  menu: boolean,
  gerenciarMenu: () => void
}

export default function Botao({ menu, gerenciarMenu }: BotaoProps) {

  return (
    <button onClick={gerenciarMenu}>
      {menu === true ? (
        <i className="fa-solid fa-angle-down fa-md"></i>
      ) : (
        <i className="fa-solid fa-angle-up fa-md"></i>
      )}
    </button>
  )
}