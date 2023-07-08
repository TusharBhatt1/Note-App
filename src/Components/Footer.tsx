export default function Footer() {

  return (
    <footer className=' text-sm sm:text-lg mt-20 border-black flex-col p-4 flex justify-center items-center gap-4 text-blue-500 font-bold'>
      <p className="text-lg text-green-500">Contact</p>
      <a href="mailto:tusharbhatt0135@gmail.com" target="_blank" className="hover:text-blue-700" rel="noreferrer" >Gmail</a>
      <p  className="hover:text-blue-500">+91761446649</p>
      <a href="https://www.linkedin.com/in/tushar-bhatt-59b64623b" rel="noreferrer" target="_blank"  className="hover:text-blue-700">LinkedIn</a>
    </footer>
  )
}
