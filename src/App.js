import React,{useEffect, useState} from 'react'
import bgmobile from "./assets/images/bg-sidebar-mobile.svg"
import bgdesktop from "./assets/images/bg-sidebar-desktop.svg"
import arcade from "./assets/images/icon-arcade.svg"
import pro from "./assets/images/icon-pro.svg"
import advanced from "./assets/images/icon-advanced.svg"
import confirm from "./assets/images/icon-thank-you.svg"
const App = () => {
  const object={"Arcade":[9,90],"Advanced":[12,120],"Pro":[15,150]}
  const object2={"Online Service":[1,10],"Larger Storage":[2,20],"Customizable Profile":[2,20]}
  
  const [currentStep,setCurrentStep]=useState(1)
  const [phone,setPhone]=useState()
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [warning,setWarning]=useState(false)
  const [monthly,setMonthly]=useState(1)
  const [yearly,setYearly]=useState(0)
  const [step2Option,setStep2Option]=useState("")
  const[step2PriceMonthly,setStep2priceMonthly]=useState("")
  const [step3Option,setStep3Option]=useState([])
  const [step3Monthly,setStep3Monthly]=useState([])
  const [step3Yearly,setStep3Yearly]=useState([])
  const [finalCost,setFinalCost]=useState(0)

  function validateMobileNumber(number) {
    const regex = /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/;
    return regex.test(number);
}
  function validateEmail(email){
    const regex=/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }
  const stepIncrementer=function(){
    const resultPhone=validateMobileNumber(phone)
    const resultEmail=validateEmail(email)
      if(phone && resultPhone && resultEmail){
        if(currentStep==1){
        setCurrentStep(currentStep+1)
      }
        else if(currentStep>=2 && step2Option){
          setCurrentStep(currentStep+1)
        }
        else{
          alert("choose one")
        }
      }
      else if(phone==null){
        setWarning(true)
      }
      else if(!resultPhone){
        alert("enter a valid number")
      }
      else if(!resultEmail){
        alert("enter a valid email")
      }
      
    
    
  }
  const step3RemoveFunction=function(usestateVar,itemNO){
    const newList=usestateVar.filter(x=>x!=itemNO)
    setStep3Option(newList)
  }
  useEffect(()=>{
    if(monthly==-1){
      setYearly(1)
    }
    else{
      setYearly(0)
    }
  },[monthly])
  useEffect(()=>{
    if(currentStep==4){
      let prevCost=finalCost
     
      prevCost=prevCost+object[step2Option][yearly]   
      step3Option.map((x)=>{prevCost+=object2[x][yearly]})
      setFinalCost(prevCost)
   
      }
      else{
        setFinalCost(0)
      }
    }
  ,[currentStep,step3Option,yearly,step2Option])

  return (
    <>
      <div className="lg:flex  justify-center items-center " style={{backgroundColor:"hsl(217, 100%, 97%)",height:100+"vh"}} >
        <img src={bgmobile} className="w-full max-h-44 lg:hidden "  alt="" style={{objectFit:"cover"}} />
        <div className="absolute rounded-xl parentContent -top-4 lg:top-10  lg:gap-20 lg:justify-center   items-center  lg:items-start lg:px-5 lg:py-4   w-full pt-10 flex flex-col lg:flex-row " >
          <div className="lg:relative steps  ">
            <img src={bgdesktop} className='hidden lg:block  rounded-lg h-full ' style={{objectFit:"cover",height:77+"vh"}} alt="" />
            <ul className="flex lg:flex-col gap-5 lg:gap-8 lg:absolute top-0 lg:items-start lg:px-5 lg:py-10 w-full">               
            <div className="flex gap-5 items-center">
                  <li className={currentStep===1 ? "current-step" :""}>1 </li>
                  <div className="hidden lg:block">
                    <p>STEP 1</p>
                    <h5>YOUR INFO</h5>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <li className={currentStep===2 ? "current-step" :""}>2 </li>
                  <div className="hidden lg:block">
                    <p>STEP 2</p>
                    <h5>SELECT PLAN</h5>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <li className={currentStep===3 ? "current-step" :""}>3 </li>
                  <div className="hidden lg:block">
                    <p>STEP 3</p>
                    <h5>SELECT PLAN</h5>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <li className={currentStep===4 ? "current-step" :""}>4 </li>
                  <div className="hidden lg:block">
                    <p>STEP 4</p>
                    <h5>SUMMARY</h5>
                  </div>
                </div>
              
              
            </ul>
          </div>
          <div className="bg-white relative contents1  lg:bg-transparent shadow-lg lg:shadow-none h-full mt-6 px-6 py-7 rounded-xl " >
          
          {currentStep==1 &&
          <div className="">
            <h2 className="font-bold mb-2  text-2xl">Personal Info</h2>
            <p className="text-lg mb-5 pr-4" style={{color:"hsl(231, 11%, 63%)"}}>Please provide your name, email address, and phone number.</p>
            <div className="w-full step1 flex flex-col gap-5">
              <div className="">
                <h4>Name</h4>
                <input placeholder='e.g. Stephen King' className="outline-none" onChange={(e)=>{setName(e.target.value)}} value={name} type="text" />
              </div>
              <div className="">
                <h4>Email Address</h4>
                <input placeholder="e.g. stephenking@lorem.com" className="outline-none" onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" />
              </div><div className="">
                <div className=" flex justify-between">
                  <h4>Phone Number</h4>
                  <h4 className="italic" style={{color:"red"}}>{warning?"This field is required":""}</h4>
                </div>
                <input placeholder="e.g. +1 234 567 890" className="outline-none" value={phone} onChange={(e)=>{setPhone(e.target.value);setWarning(false)}} type="text" />
              </div>
            </div> 
            
          </div>
            }
            {currentStep==2 && 
              <div className="w-full">
                <h2 className="font-bold mb-2  text-2xl" style={{color:"hsl(213, 96%, 18%)"}}>Select your plan</h2>
                <p className="mb-5 pr-4" style={{color:"hsl(231, 11%, 63%)",lineHeight:"25px",fontSize:17+"px",fontWeight:"400"}}>You have the option of monthly or yearly billing </p>
                <div className="lg:flex justify-around gap-3"> 
                  <div onClick={()=>{setStep2Option("Arcade");setStep2priceMonthly('$9/mo')}} className={`${step2Option=="Arcade"?"step2Selected":""} border-2 px-4 py-2 lg:py-4 lg:w-full rounded-lg mb-3`} style={{}}>
                    <div className="flex lg:flex-col gap-6 lg:items-start items-center  ">
                      <img src={arcade} className=""style={{height:40+"px"}} alt="" />
                      <div className="ml-4 lg:ml-0 ">
                        <h2 className="font-bold " style={{color:"hsl(213, 96%, 18%)"}}>Arcade</h2>
                        <p className="font-semibold  text-sm" style={{color:"hsl(231, 11%, 63%)"}}>{monthly==1?'$9/mo':"$90/yr"}</p>
                        <p className="font-semibold text-sm" style={{color:"hsl(213, 96%, 18%)"}}>{monthly==-1? "2 months free":""}</p>
                      </div>
                    </div>
                  </div>
                  <div onClick={()=>{setStep2Option("Advanced")}} className={`${step2Option=="Advanced"?"step2Selected":""} border-2 px-4 py-2 lg:py-4 lg:w-full rounded-lg mb-3`} style={{}}>
                    <div className="flex lg:flex-col lg:items-start items-center gap-6 pt-">
                      <img src={advanced} className=""style={{height:40+"px"}} alt="" />
                      <div className="ml-4 lg:ml-0 ">
                      <h2 className="font-bold " style={{color:"hsl(213, 96%, 18%)"}}>Advanced</h2>
                        <p className="font-semibold text-sm" style={{color:"hsl(231, 11%, 63%)"}}>{monthly==1?'$12/mo':"$120/yr"}</p>
                        <p className="font-semibold text-sm" style={{color:"hsl(213, 96%, 18%)"}}>{monthly==-1? "2 months free":""}</p>
                      </div>
                    </div>
                  </div>
                  <div onClick={()=>{setStep2Option("Pro")}} className={`${step2Option=="Pro"?"step2Selected":""} border-2 px-4 py-2 lg:py-4 lg:w-full  rounded-lg mb-3`} style={{}}>
                    <div className="flex lg:flex-col lg:items-start gap-6 items-center pt-">
                      <img src={pro} className=""style={{height:40+"px"}} alt="" />
                      <div className="ml-4 lg:ml-0  ">
                        <h2 className="font-bold " style={{color:"hsl(213, 96%, 18%)"}}>Pro</h2>
                        <p className="font-semibold text-sm" style={{color:"hsl(231, 11%, 63%)"}}>{monthly==1?'$15/mo':"$150/yr"}</p>
                        <p className="font-semibold text-sm" style={{color:"hsl(213, 96%, 18%)"}}>{monthly==-1? "2 months free":""}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className=" flex gap-7 justify-center   py-3 rounded-md" style={{backgroundColor:"hsl(217, 100%, 97%)"}}>
                  <h2 className="font-semibold"style={{color:"hsl(213, 96%, 18%)"}}>Monhtly</h2>
                  <div className="w-10 rounded-full relative h-6" style={{backgroundColor:"hsl(213, 96%, 18%)"}}>
                    <span onClick={(e)=>{setMonthly(monthly*-1);e.target.classList.toggle("button-action")}} className={`${monthly==-1?"button-action":""} bg-white rounded-full z-10 block absolute top-1 left-1 `} style={{width:15+"px",height:15+"px"}}></span>
                  </div>
                  <h3 className="font-semibold"style={{color:"hsl(231, 11%, 63%)"}}>Yearly</h3>
                </div>
              </div>
            }
            {currentStep==3 &&
              <div className="">
                <h2 className="font-bold mb-2  text-2xl" style={{color:"hsl(213, 96%, 18%)"}}>  Pick add-ons</h2>
                <p className="mb-5 pr-4" style={{color:"hsl(231, 11%, 63%)",lineHeight:"25px",fontSize:17+"px",fontWeight:"400"}}>  Add-ons help enhance your gaming experience.</p>
                <div className="flex w-full addon1 justify-between border-2 py-2 px-4 lg:py-3 items-center rounded-lg mb-4">
                  <div className="flex items-center gap-5">
                    <input type="checkbox" checked={step3Option.includes("Online Service")?true:false} style={{width:22+"px",height:22+"px",accentColor:"hsl(243, 100%, 62%)"}} onChange={(e)=>{document.querySelector(".addon1").classList.toggle("step2Selected");e.target.checked?setStep3Option([...step3Option,"Online Service"]):step3RemoveFunction(step3Option,"Online Service");monthly==1?setStep3Monthly([...step3Monthly,""]):setStep3Yearly([...step3Yearly,"+$10/yr"]);console.log(step3Option)}} />                         
                    <div className="">
                      <h2 className="font-semibold ">Online Service</h2>
                      <p className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Access to multiplayer games</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm" style={{color:"hsl(243, 100%, 62%)"}}>{monthly==1?"  +$1/mo":"+$10/yr"}</p>
                </div>
                <div className="flex w-full addon2 justify-between border-2 py-2 px-4 lg:py-3 items-center rounded-lg mb-4">
                  <div className="flex items-center gap-5">
                    <input type="checkbox" checked={step3Option.includes("Larger Storage")?true:false} style={{width:22+"px",height:22+"px",accentColor:"hsl(243, 100%, 62%)"}} onChange={(e)=>{document.querySelector(".addon2").classList.toggle("step2Selected");e.target.checked?setStep3Option([...step3Option,"Larger Storage"]):step3RemoveFunction(step3Option,"Larger Storage");monthly==1?setStep3Monthly([...step3Monthly,""]):setStep3Yearly([...step3Yearly,"+$20/yr"])}} />
                    <div className="">
                      <h2 className="font-semibold ">Larger Storage</h2>
                      <p className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Extra 1TB of cloud save</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm" style={{color:"hsl(243, 100%, 62%)"}}>{monthly==1?"  +$2/mo":"+$20/yr"}</p>
                </div>
                <div className="flex w-full addon3 justify-between border-2 py-2 px-4 lg:py-3 items-center rounded-lg">
                  <div className="flex items-center gap-5">
                    <input type="checkbox" checked={step3Option.includes("Customizable Profile")?true:false} style={{width:22+"px",height:22+"px",accentColor:"hsl(243, 100%, 62%)"}} onChange={(e)=>{document.querySelector(".addon3").classList.toggle("step2Selected");e.target.checked?setStep3Option([...step3Option,"Customizable Profile"]):step3RemoveFunction(step3Option,"Customizable Profile");monthly==1?setStep3Monthly([...step3Monthly,""]):setStep3Yearly([...step3Yearly,"+$20/yr"])}} />
                    <div className="">
                      <h2 className="font-semibold ">Customizable Profile</h2>
                      <p className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Custom theme on your profile</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm" style={{color:"hsl(243, 100%, 62%)"}}>{monthly==1?"+$2/mo":"+$20/yr"}</p>
                </div>
              </div>
            }
            {currentStep==4 &&
              <div className="">
                <h2 className="font-bold mb-2  text-2xl" style={{color:"hsl(213, 96%, 18%)"}}>Finishing up</h2>
                <p className="mb-5 pr-4" style={{color:"hsl(231, 11%, 63%)",lineHeight:"25px",fontSize:17+"px",fontWeight:"400"}}>  Double-check everything looks OK before confirming.</p>
                <div className="p-5" style={{backgroundColor:"hsl(217, 100%, 97%)"}}>
                  <div className="flex justify-between items-center ">
                    <div className="">
                      <h1 className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>{step2Option}({monthly==1?"monthly":"yearly"})</h1>
                      <button onClick={()=>{setCurrentStep(2)}} className=' underline' style={{color:"hsl(231, 11%, 63%)"}}>Change</button>
                    </div>
                    <p className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>{object[step2Option][yearly]}{monthly==1?"$/mo":"$/yr"}</p>
                  </div>
                  <hr className="my-3 lg:my-5" />
                  <div className="">
                    {step3Option.map(x=>{
                      
                    return <div className="flex mb-2 justify-between">
                      <p className="text-sm"  style={{color:"hsl(231, 11%, 63%)"}}>{x}</p>
                      <p className="text-sm font-semibold">+{object2[x][yearly]}$/{monthly==1?"mo":"yr"}</p>
                    </div>
                    })}
                  </div>
                </div>
                <div className="flex justify-between items-center px-5 py-2 mt-3">
                  <p className="text-md" style={{color:"hsl(231, 11%, 63%)"}}>Total(per {monthly==1?"month":"year"})</p>
                  <p className="font-bold lg:text-lg" style={{color:"hsl(243, 100%, 62%)"}}>+{finalCost}$/{monthly==1?"mo":"yr"}</p>
                </div>
              </div>
            }
            {currentStep==5 &&
              <div className="flex flex-col text-center gap-3 items-center justify-center h-96 w-full">
                <img src={confirm} alt="" style={{width:100+"px",height:100+"px"}} />
                <h1 className="text-3xl font-bold mt-4">Thank you!</h1>
                <p style={{color:"hsl(231, 11%, 63%)"}}> Thanks for confirming your subscription! We hope you have fun 
                    using our platform. If you ever need support, please feel free 
                    to email us at support@loremgaming.com.</p>
              </div>
            }
            {currentStep<5 &&
            <div className="bg-white lg:bg-transparent hidden lg:block w-full mr-20  h-20 absolute bottom-0 " > 
              {currentStep!=1 &&
                <div className="">
                  <button onClick={()=>{setCurrentStep(currentStep-1)}} className="absolute bottom-9 font-medium  " style={{color:"hsl(231, 11%, 63%)"}}>Go Back</button>
                </div>
              }
              <button onClick={()=>{stepIncrementer()}} className="px-5 py-3 text-white font-semibold rounded-md absolute right-12 bottom-6 " style={{backgroundColor:"hsl(213, 96%, 18%)"}}>{currentStep==4?"Confirm":"Next Step"}</button>
            </div>
            }
          </div>
        </div>
        {currentStep<5 &&
        <div className="bg-white lg:bg-transparent lg:hidden w-full  absolute bottom-0" style={{height:11+"vh"}}>
              {currentStep!=1 &&
                <div className="">
                  <button onClick={()=>{setCurrentStep(currentStep-1)}} className={` absolute left-5 bottom-6 font-medium`} style={{color:"hsl(231, 11%, 63%)"}}>Go Back</button>
                </div>
              }
              <button onClick={()=>{stepIncrementer()}} className="px-5  text-sm py-3 text-white font-semibold rounded-md absolute right-5 bottom-3 " style={{backgroundColor:"hsl(213, 96%, 18%)"}}>{currentStep==4?"Confirm":"Next Step"}</button>
        </div>
        }
      </div>
    </>
  )
}

export default App