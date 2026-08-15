import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [isDoctorsLoading, setIsDoctorsLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctosData = async () => {

        setIsDoctorsLoading(true)
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsDoctorsLoading(false)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
                // Clear invalid token
                if (data.message.includes('invalid signature') || data.message.includes('jwt')) {
                    localStorage.removeItem('token')
                    setToken('')
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            // Clear invalid token
            if (error.message.includes('invalid signature') || error.message.includes('jwt')) {
                localStorage.removeItem('token')
                setToken('')
            }
        }

    }

    useEffect(() => {
        getDoctosData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value = {
        doctors, getDoctosData, isDoctorsLoading,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
