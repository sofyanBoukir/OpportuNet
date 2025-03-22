import React, { useEffect, useRef, useState } from "react";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { NotificationApp } from "../components/App/NotificationApp";
import { NotificationsSkeleton } from "../components/skeletons/NotificationsSkeleton";
import { deleteNotification, getUserNotifications, makeNotificationsSeen } from "../services/notification";
import { Button } from "../components/UI/Button";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
const authService = import.meta.env.VITE_SERVER_URL;

export const Notifications = () => {

    const [notifications,setNotifications] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errMessage,setErrMessage] = useState('')
    const [page,setPage] = useState(1)
    const loadingRef = useRef(false)
    const [lastPage,setLastPage] = useState(null)
    const [totalNotifications,setTotalNotifications] = useState(null)
    const [close,setClose] = useState(false);
    const [notificationsDelivred,setNotificationsDelivred] = useState(false)
    const dispatch = useDispatch()

    const _getUserNotifications = async () =>{
        try{
            if(loadingRef.current) return
            loadingRef.current = true
            
            const response = await getUserNotifications(localStorage.getItem('token'),page)
            setLastPage(response.data.lastPage)
            setTotalNotifications(response.data.totalNotifications)
            loadingRef.current = false
            setTimeout(() => {
              setLoading(false)
            }, 3000);  
            
            setTimeout(() => {
                setLoading(false)
            }, 3000);
            if(response.status === 200){
                if(response.data.notifications){
                    setNotifications((prevNotifications) => [...prevNotifications, ...response.data.notifications]);
                }
                setNotificationsDelivred(true)
            }
        }catch(err){
            setErrMessage(err.response.data.message)
        }
    }

    const _makeNotificationsSeen = async () =>{
      const response = await makeNotificationsSeen(localStorage.getItem('token'));
      
      if(response.status === 200){
        dispatch({type:'UPDATE_NOTIFIED_TIMES',payload:0})
      }
    }


    const _deleteNotification = async (notificationId) =>{
        setClose(false)
        const response = await deleteNotification(localStorage.getItem('token'),notificationId)
        
        if(response.status === 200){
          const newNotifications = notifications.filter((notification) => notification._id !== notificationId);
          setNotifications(newNotifications)
          setClose(true)
        }
    }

    useEffect(() =>{
        _getUserNotifications()
    },[page])

    useEffect(() =>{
      notificationsDelivred && _makeNotificationsSeen()
    },[notificationsDelivred])
  const suggestions = [
    { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
    { sugName: "Soufiane Boukir", sugHead: "Go developer" },
    { sugName: "Said kachoud", sugHead: "PHP developer" },
  ];
  
  return (
    <div className="md:px-[8%] px-3 relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col w-[100%] lg:w-[43%] h-max left-[13%] lg:relative bg-white rounded-2xl ">
          {/* <NotificationApp />
          <NotificationApp />
          <NotificationApp /> */}
          {
            !loading && notifications.length ?
                notifications.map((notification,index) => {
                    return <NotificationApp close={close} key={index} notification={notification} deleteNotification={_deleteNotification}/>
                })
            :null
          }
          {!loading && lastPage !== page && totalNotifications !== 0 && <ArrowDownCircleIcon onClick={() => setPage(page+1)} className="flex mx-auto cursor-pointer my-3 text-blue-700 hover:text-blue-600 duration-200 w-12 h-12" /> }
          {/* <Button type={'button'} text={'View more'} className={'bg-blue-500 text-white my-2'} onClick={() => setPage(page+1)}/> */}
          {
            loading && <NotificationsSkeleton />
          }
          {
            !loading && totalNotifications === 0 && <span className="py-2 px-3 text-lg font-semibold">You hasn't notified yet!</span>
          }
        </div>

        <div className="hidden sticky  lg:block left-[14%] lg:relative lg:w-[26%]">
          <div className="sticky top-16">
            <SuggestionsModal suggestionList={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};
