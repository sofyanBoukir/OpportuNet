import { Profile } from './Profile'
import { AppSelector } from '../../selectors/AppSelector'

export const ProfileStatus = () => {
  const {userData} = AppSelector();

  var score = 2;
  userData.education.length !== 0 ? score += 1 : score;
  userData.experience.length !== 0 ? score += 1 : score;
  userData.skills.length !== 0 ? score += 1 : score;
  userData.interests.length !== 0 ? score += 1 : score;
  userData.location !== '' ? score += 1 : score;
  userData.website !== '' ? score += 1 : score;
  userData.headLine !== '' ? score += 1 : score;
  userData.about !== 'Hi👋, I am using opportuNet app!' && userData.about !== '' ? score += 1 : score;



  return (
    <div className="w-[22%] dark:text-white hidden flex-col left-[8%] fixed lg:flex">
        <div>
        <Profile />
        </div>
        <div className="bg-white dark:bg-black rounded-xl mt-2 flex justify-center gap-5 py-2">
          <div className="text-center duration-200 p-1 cursor-pointer">
              <p className="font-semibold text-2xl">{userData.followers?.length}</p>
              <span className='font-semibold'>Followers</span>
          </div>
          <div className="text-center duration-200 p-1 cursor-pointer">
              <p className="font-semibold text-2xl">{userData.following?.length}</p>
              <span className='font-semibold'>Followings</span>
          </div>
        </div>


        <div className="bg-white dark:bg-black rounded-xl mt-2 px-3 py-2">
          <h1 className='text-2xl font-semibold'>Activity</h1>
          <div class="relative w-[50%] mx-auto">
            <svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="50 100" stroke-linecap="round"></circle>

              <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-black dark:text-white" stroke-width="1.5" stroke-dasharray={`${50*score / 10} 100`} stroke-linecap="round"></circle>
            </svg>

            <div class="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
              <span class="text-3xl font-bold text-black dark:text-white pt-4">{score}/10</span>
              <br></br>
              <span class="font-bold text-black dark:text-white pt-4">Progress</span>
            </div>
          </div>

          <div className='mt-[-50px]'>
            <p className='text-xl font-semibold'>Interests</p>
            <div>
              {
                userData?.interests?.slice(0,3).map((interest) =>{
                  return <span>{interest.interest}, </span>
                })
              }
              and {userData.interests.length - 4} more
            </div>

            <br></br>
            
            <p className='text-xl font-semibold'>Skills</p>
            {
              userData.skills.length ? 
              <div>
                {
                  userData?.skills?.slice(0,3).map((skill) =>{
                    return <span>{skill}, </span>
                  })
                }
                {userData.skills.length > 4 ? "and " + String(userData.skills.length - 3) + "more" : null}
              </div> : "Not setted yet"
            }

            <br></br>
            <div className='mt-1'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold'>Liked posts</span>
                <span>{userData?.likedPosts.length}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-lg font-semibold'>Saved posts</span>
                <span>{userData?.savedPosts.length}</span>
              </div>
{/* 
              <div className='flex justify-between'>
                <span className='text-lg font-semibold'>Seen posts</span>
                <span>{0}</span>
              </div> */}
            </div>
          </div>
        </div>
    </div>
  )
}
