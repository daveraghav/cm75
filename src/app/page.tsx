import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] p-8">
      <h1 className="text-5xl font-['Philosopher'] text-[#2C413B] mb-8">CM Events & Registration</h1>
      <div className="flex gap-6">
        <Link 
          href="/registration" 
          className="px-8 py-4 bg-[#6F9283] text-white rounded-xl font-['Lexend'] hover:bg-[#5C7B6D] transition-colors shadow-lg"
        >
          Registration Form
        </Link>
        <Link 
          href="/timeline" 
          className="px-8 py-4 bg-white text-[#2C413B] border-2 border-[#6F9283] rounded-xl font-['Lexend'] hover:bg-gray-50 transition-colors shadow-lg"
        >
          Event Timeline
        </Link>
      </div>
    </div>
  );
}
