import { createFileRoute } from '@tanstack/react-router'
import donate from "../assets/donate.png";
import volunteer from "../assets/volunteer.png";
import idea from "../assets/idea.png";

export const Route = createFileRoute('/get-involved')({
  component: GetInvolved
})

function GetInvolved() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center my-4 gap-y-4">
      <div className="container space-y-4 px-4">
        <h1 className="text-4xl font-bold">How You Can Help</h1>
      </div>
      <div className="w-screen my-4 gap-y-4 grid grid-cols-3">

        <div className="group">
          <h2 className="text-3xl font-bold underline divide-x-2">Donate</h2>
            <div className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="grid grid-rows-4 my-2">
              <a href='https://ontarionature.org/give/' target="_blank" className='text-blue-600 visited:text-purple-600'>Ontario Nature</a>
              <a href='https://wwf.ca/donate/' target="_blank" className='text-blue-600 visited:text-purple-600'>World Wildlife Fund</a>
              <a href='https://wcscanada.org/donate/' target="_blank" className='text-blue-600 visited:text-purple-600'>World Wildlife Conservation Society Canada</a>
              <a href='https://www.ontariowildliferescue.ca/donate/' target="_blank" className='text-blue-600 visited:text-purple-600'>Ontario Wildlife Rescue</a>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <img src={donate} className="w-48 h-48" />
            </div>
        </div>


        <div className="group">
          <h2 className="text-3xl font-bold underline divide-x-2">Volunteer</h2>
            <div className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="grid grid-rows-4 my-2">
              <a href='https://turtleprotectors.com/' target="_blank" className='text-blue-600 visited:text-purple-600'>Turtle Protectors</a>
              <a href='https://wildlifepreservation.ca/get-involved/volunteer/' target="_blank" className='text-blue-600 visited:text-purple-600'>Wildlife Preservation Canada</a>
              <a href='https://ontarionature.org/take-action/volunteer/' target="_blank" className='text-blue-600 visited:text-purple-600'>Ontario Nature</a>
              <a href='https://www.natureconservancy.ca/en/what-you-can-do/conservation-volunteers/' target="_blank" className='text-blue-600 visited:text-purple-600'>Nature Conservancy</a>
              <a href='https://trca.ca/get-involved/volunteer/' target="_blank" className='text-blue-600 visited:text-purple-600'>Toronto and Region Conservation Authority</a>
              <a href='https://ontarioturtle.ca/get-involved/volunteer/' target="_blank" className='text-blue-600 visited:text-purple-600'>Ontario Turtle Conservation Centre</a>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <img src={volunteer} className="w-48 h-48" />
            </div>
        </div>

        <div className="group">
          <h2 className="text-3xl font-bold underline divide-x-2">Additional Tips</h2>
            <div className="opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <div className="grid grid-rows-4 my-2"> 
                  <a href='https://www.endangered.org/10-easy-things-you-can-do-to-save-endangered-species/' target="_blank" className='text-blue-600 visited:text-purple-600'>10 things you can do to save endangered species</a>
                  <a href='https://awionline.org/content/what-you-can-do-terrestrial-wildlife' target="_blank" className='text-blue-600 visited:text-purple-600'>What you can do for terrestrial wildlife</a>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <img src={idea} className="w-48 h-48 flex justify-center" />
            </div>
        </div>


      </div>
    </div>
  );
}