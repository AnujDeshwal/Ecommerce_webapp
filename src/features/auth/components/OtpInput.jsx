import { useEffect, useRef, useState } from "react";
import "./otp.css";
import { otpgenerationAsync } from "../authSlice";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
const OtpInput = ({ length, onOtpSubmit , email ,status , OTP,wrong}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(length).fill(""));
//   below thing is you will get your whole otp in form of string 
  const combinedOtp = otp.join("");
  const inputRef = useRef([]);
  useEffect(() => {
    // dependency array is empty it means useEffect only will run for first time when this componet would render for first time , and i want it as soon as this componet would render so focus will go to first input field automatically , it enhances user experience
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  useEffect(() => {
    console.log("render");
    console.log("this is status:",status)
    console.log("this is email:",email)
  });
  const handleChange = (index, e) => {
    const value = e.target.value;
    // bascally if value is not a number so return means we  are not setting anything to the value attribute to the input field means nothing will be shown to us in the input field
    // console.log("this is value:",value);
    //    means if you will enter the space so it will not move to the next input field
    if (isNaN(value) || value.indexOf(" ") > -1) return;
    // console.log("this is value:",value)
    // here if you do const newOtp = otp so it is a shallow copy which means that you have not created a new array you have just created a another refrence which is also pointing to the same array otp which means that you created a new pointer pointing to the same place it means that if any change will happend to the newOtp so that change would occur to the otp also and then you are doing like setOtp(newOtp ) it means you passed the same array state to it , means react need another state to set , when you will give new array or new state to it so it re render the components and then it will be shown in the input field because now value of input field will be changed due to component re rendering so to provide it with the  new array you must do the deep copy , deep copy means element would be copied only not the refrence means now they  will not point to the same location so always use spread operator to do the deep copy
    const newOtp = [...otp];
    // below thing is that we just need last character of the value because you know that in one input field you will be writing only one digit
    newOtp[index] = value.substr(value.length - 1);
    setOtp(newOtp);
    // here we joined the all elements of the newOtp array and right now why did we not join the otp array because setOtp} is ascyncronous so it would not be updated till right now use newOtp instead
    // below function was passed in this component but that function is defined anywhere else in the component which is calling this component
    // this below thing is for that we do need to click verify otp it automatically verify user as soon as all input field get filled so 
    // submit trigger
    // if (combinedOtp.length === length) {
    //   onOtpSubmit(combinedOtp);
    // } //move to the next input field , below one problem was persisting that when you use backspace so below is the logic to move to the previouse field , so what backspace is doing that it is letting to move to the previouse input field that it is doing its role of removing and then it was automatically shifting to the next index because below if you see there is else if but previously there was no any else if only else so you must check if there is a element in current input so only you would move focus to the next
     if (index+1<length && newOtp[index]) {
      //below thing is that if you would input anything in the input field then immediately it will move to the next input field it enhances user experience
      inputRef.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    // here the thing is setSelectionRange is like when we select a portion of a data and it appears to be resided in a blue color so same below line do it will automatically select the portion when you will give start and end position so it is good move to move the cursor automatically if the cursor is before the digit so it will be moved to the after of digit auto matically by this because we are selecting the element from 1th index which will exist after the first element 
    inputRef.current[index].setSelectionRange(1,1);
  };
  const handleKeyDown = (index, e) => {
    // in js you need to apply check for each thing like if you have access of previous dom element so check if inputRef.current[index-1]
    // i am doing this for as soon as i will press backspace on an input field so it will move to the previous field but here what is happening that it is moving to the previous field but it is deleting previouse input field digit as well because backspace default behaviour is executing after go to the previous field so do one thing when current otp[index] is empty that only execute below if condition but if otp[index] exist so of course  then let the default behaviour of backspace do its work then peeche nahi jaana 
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
      e.preventDefault();
    }
  };



  return (
    <>
      {email && <div className="mainA">
        <div className="centerA">
          <form  className="otpForm" onSubmit={e=>{onOtpSubmit(combinedOtp); e.preventDefault();}} >
            <h1>Verify</h1>
            {status==="idle" && (
                <p className="text-green-500">OTP Sent Successfully</p>
              )}
              { status === 'loading' && <CircularProgress color="success" style={{marginTop:"10px"}} />}
            <div className="Inputfield">
              {/* may be you have forgotten that in the jsx if you want to write js code so you have to first open the braces basically in the braces you can  write a expression which is returning something  */}
              {otp.map((value, index) => {
                return (
                  <input
                    type="text"
                    key={index}
                    value={value}
                    ref={(input) => {
                      inputRef.current[index] = input;
                    }}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    required
                  />
                );
              })}
            </div>
            <button type = "submit">Verify</button>   
            <h4>
              Didn't receive code? <span onClick={e=>{dispatch(otpgenerationAsync(email)); OTP=null;}}>Request again</span>
            </h4>
            {wrong && <p className='text-red-500'>Wrong OTP</p>}
          </form>
        </div>
      </div>}
    </>
  );
};

export default OtpInput;
