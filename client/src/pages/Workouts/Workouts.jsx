import { useEffect } from "react";
import WorkoutCalendar from "../../components/Workout/Calendar/WorkoutCalendar";
import { useAuth } from "../../components/AuthContext/AuthContext";
import LoginRegisterModal from "../../components/LoginRegister/LoginRegisterModal";
import { useState } from "react";

const Workouts = () => {
  
  const { token } = useAuth();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if(!token) {
      setModalShow(true);
    }
  }, [token]);

  return (
    <>
      <WorkoutCalendar />
      <LoginRegisterModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
}

export default Workouts;
