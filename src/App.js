import React,{useState,useEffect} from 'react'
import bgMobile from "./assets/images/bg-sidebar-mobile.svg"
import bgDesktop from "./assets/images/bg-sidebar-desktop.svg"
import arcade from "./assets/images/icon-arcade.svg"
import advanced from "./assets/images/icon-advanced.svg"
import pro from "./assets/images/icon-pro.svg"
import thankyou from "./assets/images/icon-thank-you.svg"
const App = () => {
const step2Object={"monthly":[9,12,15],"yearly":[90,120,150]}
const step3Object={"online services":[10,1],"larger storage":[20,2],"customizable profile":[20,2]}
const [currentStep,setCurrentStep]=useState(1)

const [phoneWarning,setPhoneWarning]=useState(false)
const [phone,setPhone]=useState()
const [email,setEmail]=useState()
const [name,setName]=useState()
const [finalCost,setFinalCost]=useState(0)

const [monthly,setMonthly]=useState(1)
const [yearly,setYearly]=useState("yearly")

const [step2Plan,setStep2Plan]=useState(null)
const [planNum,setPlanNum]=useState()
const [step3Selection,setStep3Selection]=useState([])
const [addonNum,setAddonNum]=useState([])

const validatePhone=function(p){
  const regex=/^[0-9()-]+$/
  return regex.test(p)
}
const stepIncrementer=function(i){
  const phoneResult=validatePhone(phone)
  if(phone==null){
    setPhoneWarning(true)
  }
  else if(!phoneResult){
    alert("enter a valid phone number")
  }
  else if (currentStep==2 && step2Plan==null){
    alert("select one")
  }
  else{
    setPhoneWarning(false)
    setCurrentStep(currentStep+i)
  }
}
const calc=function(){
  let x=step2Object[yearly][planNum]
  step3Selection.map(x=>
    x=x+finalCost+step3Object[x][monthly]
  )
  setFinalCost(x)
}
useEffect(()=>{
  if(monthly==1){
    setYearly("monthly")
  }
  else{
    setYearly("yearly")
    setMonthly(0)
  }
},[monthly,yearly])
useEffect(()=>{
  if(step2Plan=="Arcade"){
    setPlanNum(0);
  }
  else if(step2Plan=="Advanced"){
    setPlanNum(1);
  }
  else{
    setPlanNum(2);
  }
},[planNum,step2Plan])
useEffect(()=>{
  let y=step2Object[yearly][planNum]
  step3Selection.map(x=>y=y+step3Object[x][monthly])
  setFinalCost(y)
},[yearly,planNum,monthly,step3Selection])
  return (
    <>
    <div className="h-screen w-screen relative flex flex-col lg:flex-row items-center lg:justify-center  " style={{backgroundColor:"hsl(217, 100%, 97%)"}}>
      <img src={bgMobile} className="w-full max-h-48 lg:hidden" style={{objectFit:"cover"}} alt="" />
      <div className="absolute w-full h-3/4  lg:w-4/5 lg:max-w-4xl lg:relative lg:flex lg:justify-start lg:bg-white rounded-lg p-3 gap-10" >
        <div className=" absolute lg:relative top-0 left-0 lg:top-auto overflow-hidden  flex lg:flex-col justify-center lg:justify-start w-full lg:w-1/4 px-5 py-8 rounded-lg lg:bg-green-500    gap-6">
          <img src={bgDesktop} className="absolute w-full h-full left-0 top-0 hidden lg:block " style={{objectFit:"cover"}} alt="" />
          <div className="flex items-center z-10">
            <span className={`${currentStep==1?"activeStep":""} rounded-full text-white border-white border-2  px-3 py-1`} >1</span>
            <div className="hidden ml-4 lg:block">
              <h2 className="text-sm" style={{color:"hsl(229, 24%, 87%)"}}>STEP 1</h2>
              <h2 className="text-white font-medium text-sm">YOUR INFO</h2>
            </div>
          </div>
          <div className="flex items-center z-10">
          <span className={`${currentStep==2?"activeStep":""} rounded-full text-white border-white border-2  px-3 py-1`} >2</span>
            <div className="hidden ml-4 lg:block">
              <h2 className="text-sm" style={{color:"hsl(229, 24%, 87%)"}}>STEP 2</h2>
              <h2 className="text-white font-medium text-sm">SELECT PLAN</h2>
            </div>
          </div>
          <div className="flex items-center z-10">
          <span className={`${currentStep==3?"activeStep":""} rounded-full text-white border-white border-2  px-3 py-1`} >3</span>
            <div className="hidden ml-4 lg:block">
              <h2 className="text-sm" style={{color:"hsl(229, 24%, 87%)"}}>STEP 3</h2>
              <h2 className="text-white font-medium text-sm">ADD-ONS</h2>
            </div>
          </div>
          <div className="flex items-center z-10">
          <span className={`${currentStep==4?"activeStep":""} rounded-full text-white border-white border-2  px-3 py-1`} >4</span>
            <div className="hidden ml-4 lg:block">
              <h2 className="text-sm" style={{color:"hsl(229, 24%, 87%)"}}>STEP 4</h2>
              <h2 className="text-white font-medium text-sm">SUMMARY</h2>
            </div>
          </div>
        </div>
        <div className="flex  justify-center w-full lg:w-3/4">
          <div className=" px-6 py-6 absolute lg:relative lg:top-auto top-24 rounded-lg bg-white " style={{width:90+"%"}}>
            {currentStep==1 &&
              <div className="">
                  <h2 className="text-2xl font-bold mb-3" style={{color:"hsl(213, 96%, 18%)"}}>Personal info</h2>
                  <h2 className="text-lg" style={{color:"hsl(231, 11%, 63%)",lineHeight:25+"px"}}>Please provide your name, email address, and phone number.</h2>
                  <div className="mb-3 mt-5">
                    <h4 className="font-semibold" style={{color:"hsl(213, 96%, 18%)"}}>Name</h4>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className=" outline-none px-4 py-2 border-2 w-full rounded-md" placeholder="e.g. Stephen King" />
                    
                  </div>
                  <div className="mb-3 ">
                    <h4 className="font-semibold" style={{color:"hsl(213, 96%, 18%)"}}>Email Address</h4>
                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="outline-none px-4 py-2 border-2 w-full rounded-md" placeholder="e.g. stephenking@lorem.com" />
                  </div>
                  <div className="mb-3 ">
                    <div className="flex justify-between">
                      <h4 className="font-semibold" style={{color:"hsl(213, 96%, 18%)"}}>Phone</h4>
                      <h4 className=" text-sm font-semibold italic" style={{color:"hsl(354, 84%, 57%)"}}>{phoneWarning?"This field is required":""}</h4>
                    </div>
                    <input type="text" value={phone} className={`${phoneWarning?" border-red-400":""} outline-none px-4 py-2 border-2 w-full rounded-md`} onChange={(e)=>{setPhone(e.target.value)}} placeholder="e.g. +1 234 567 890" />
            </div> 
              </div>
            }
            {currentStep==2 &&
               <div className="">
                  <div className="">
                    <h2 className="text-2xl font-bold mb-1" style={{color:"hsl(213, 96%, 18%)"}}>Select your plan</h2>
                    <h2 className="text-lg" style={{color:"hsl(231, 11%, 63%)",lineHeight:25+"px"}}>You have the option of monthly or yearly billing</h2>
                    <div className="flex flex-col lg:flex-row gap-3 my-5 ">

                      <div className={`${step2Plan=="Arcade"?"step2PlanSelected":""} flex gap-4 border rounded-lg px-2 py-1 w-full lg:flex-col lg:px-4 lg:gap-6 lg:py-3`} onClick={()=>{setStep2Plan("Arcade")}}>
                        <img src={arcade} className="w-12 h-12 lg:w-14 lg:h-14"alt="" />
                        <div className="">
                          <h2 className="font-bold text-md lg:text-lg" style={{color:"hsl(213, 96%, 18%)"}}>Arcade</h2>
                          <h2 className="text-sm font-semibold" style={{color:"hsl(231, 11%, 63%)"}}>${step2Object[yearly][0]}/{monthly==1?"mo":"yr"}</h2>
                          {monthly!=1 &&
                            <h2 className="text-sm"style={{color:'hsl(213, 96%, 18%)'}}>2 months free</h2>
                          }
                        </div>
                      </div>

                      <div className={`${step2Plan=="Advanced"?"step2PlanSelected":""} flex gap-4 border rounded-lg px-2 py-1 w-full lg:flex-col lg:px-4 lg:gap-6 lg:py-3`} onClick={()=>{setStep2Plan("Advanced")}}>
                        <img src={advanced} className="w-12 h-12 lg:w-14 lg:h-14"alt="" />
                        <div className="">
                          <h2 className="font-bold text-md lg:text-lg" style={{color:"hsl(213, 96%, 18%)"}}>Advanced</h2>
                          <h2 className="text-sm font-semibold" style={{color:"hsl(231, 11%, 63%)"}}>${step2Object[yearly][1]}/{monthly==1?"mo":"yr"}</h2>
                          {monthly!=1 &&
                            <h2 className="text-sm"style={{color:'hsl(213, 96%, 18%)'}}>2 months free</h2>
                          }
                        </div>
                         
                      </div>
                      <div className={`${step2Plan=="Pro"?"step2PlanSelected":""} flex gap-4 border rounded-lg px-2 py-1 w-full lg:flex-col lg:px-4 lg:gap-6 lg:py-3`} onClick={()=>{setStep2Plan("Pro")}}>
                        <img src={pro} className="w-12 h-12 lg:w-14 lg:h-14"alt="" />
                        <div className="">
                          <h2 className="font-bold text-md lg:text-lg" style={{color:"hsl(213, 96%, 18%)"}}>Pro</h2>
                          <h2 className="text-sm font-semibold" style={{color:"hsl(231, 11%, 63%)"}}>${step2Object[yearly][2]}/{monthly==1?"mo":"yr"}</h2>
                          {monthly!=1 &&
                            <h2 className="text-sm"style={{color:'hsl(213, 96%, 18%)'}}>2 months free</h2>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-5 rounded-md py-3" style={{backgroundColor:"hsl(217, 100%, 97%)"}}>
                      <h2 className="font-medium" style={{color:"hsl(213, 96%, 18%)"}}>Monthly</h2>
                      <div className="w-12 h-6 rounded-full relative" style={{backgroundColor:"hsl(213, 96%, 18%)"}}>
                        <span className={`${monthly==1 ?"":"buttonAction"} w-4 h-4 rounded-full bg-white absolute top-1 left-1 `} onClick={(e)=>{monthly==0?setMonthly(1):setMonthly(0)}} ></span>
                      </div>
                      <h2 className="font-medium" style={{color:"hsl(231, 11%, 63%)"}}>Yearly</h2>
                    </div>
                  </div>
                </div>
            }
            {currentStep==3 &&
            
              <div className="">
                <h2 className="text-2xl font-bold mb-3" style={{color:"hsl(213, 96%, 18%)"}}>Pick add-ons</h2>
                <h2 className="text-lg" style={{color:"hsl(231, 11%, 63%)",lineHeight:25+"px"}}>Add-ons help enhance your gaming experience</h2>
                <div className="my-4 flex flex-col gap-3">
                  <div className={`${step3Selection.includes("online services")?"step2PlanSelected":""} flex justify-between items-center rounded-lg border-2 px-4 py-3  option1 `}>
                    <div className="flex items-center gap-4 ">
                      <input type="checkbox"  checked={step3Selection.includes("online services") ? true : false} onChange={(e)=>{document.querySelector(".option1").classList.toggle("step2PlanSelected");
                                                            
                                                            e.target.checked ? setStep3Selection([...step3Selection,"online services"]): setStep3Selection(step3Selection.filter(x=>x!="online services"));
                                                            console.log(step3Selection)}} 
                                                            style={{width:20+"px",height:25+"px",accentColor:"hsl(263, 97%, 35%)"}} />
                      <div className="">
                        <h2 className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>Online Services</h2>
                        <h2 className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Access to multiplayer games</h2>
                      </div>
                    </div>
                    <h2 style={{color:"hsl(263, 97%, 35%)"}}>+${step3Object["online services"][monthly]}/{monthly==1?"mo":"yr"}</h2>
                  </div>
                  <div className={`${step3Selection.includes("larger storage")?"step2PlanSelected":""} flex justify-between items-center rounded-lg border-2 px-4 py-3  option2 `}>
                    <div className="flex items-center gap-4 ">
                      <input type="checkbox" checked={step3Selection.includes("larger storage") ? true : false} onChange={(e)=>{document.querySelector(".option2").classList.toggle("step2PlanSelected");
                                                            
                                                            e.target.checked ?setStep3Selection([...step3Selection,"larger storage"]): setStep3Selection(step3Selection.filter(x=>x!="larger storage"));
                                                            }} 
                                                            style={{width:20+"px",height:25+"px",accentColor:"hsl(263, 97%, 35%)"}} />
                      <div className="">
                        <h2 className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>Larger Storage </h2>
                        <h2 className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Extra 1TB of cloud save</h2>
                      </div>
                    </div>
                    <h2 style={{color:"hsl(263, 97%, 35%)"}}>+${step3Object["larger storage"][monthly]}/{monthly==1?"mo":"yr"}</h2>
                  </div>
                  <div className={`${step3Selection.includes("customizable profile")?"step2PlanSelected":""} flex justify-between items-center rounded-lg border-2 px-4 py-3  option3 `}>
                    <div className="flex items-center gap-4 ">
                      <input type="checkbox"  checked={step3Selection.includes("customizable profile") ? true : false} onChange={(e)=>{document.querySelector(".option3").classList.toggle("step2PlanSelected");
                                                            
                                                            e.target.checked ? setStep3Selection([...step3Selection,"customizable profile"]) :setStep3Selection(step3Selection.filter(x=>x!="customizable profile"));
                                                            console.log(step3Selection)}} 
                                                            style={{width:20+"px",height:25+"px",accentColor:"hsl(263, 97%, 35%)"}} />
                      <div className="">
                        <h2 className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>Customizable Profile</h2>
                        <h2 className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Custom theme on your profile</h2>
                      </div>
                    </div>
                    <h2 style={{color:"hsl(263, 97%, 35%)"}}>+${step3Object["customizable profile"][monthly]}/{monthly==1?"mo":"yr"}</h2>
                  </div>
                </div>
              </div>
            }
            {currentStep==4 &&
              <div className="">
                <h2 className="text-2xl font-bold mb-3" style={{color:"hsl(213, 96%, 18%)"}}>Finishing up</h2>
                <h2 className="text-lg" style={{color:"hsl(231, 11%, 63%)",lineHeight:25+"px"}}>Double-check everyhting looks OK before continuing</h2>
                <div className="p-5 mt-5" style={{backgroundColor:"hsl(217, 100%, 97%)"}}>
                  <div className="flex justify-between ">
                    <div className="">
                      <h2 className="font-bold" style={{color:"hsl(213, 96%, 18%)"}}>{step2Plan}({monthly==1?"Monthly":"Yearly"})</h2>
                      <button className="underline" onClick={()=>{stepIncrementer(-2)}}>change</button>
                    </div>
                    <h2>${step2Object[yearly][planNum]}/{monthly==1?"mo":"yr"}</h2>
                  </div>
                  <hr className="my-5" />
                  <div className=" flex flex-col gap-1 ">
                    {step3Selection.map((x)=>{
                      
                      return <div className="flex justify-between">
                        <div className="" style={{color:"hsl(231, 11%, 63%)"}}>{x}</div>
                        <div className="text-sm" style={{color:""}}>+{step3Object[x][monthly]}$/{monthly==1?"mo":"yr"}</div> 
                      </div>
                      
                    })}
                  </div>
                </div>
                <div className="flex justify-between items-center py-5">
                  <h2 className="text-sm" style={{color:"hsl(231, 11%, 63%)"}}>Total (per month)</h2>
                  <h2 className="font-bold text-lg" style={{color:"hsl(263, 97%, 35%)"}}>+${finalCost}/{monthly==1?"mo":"yr"}</h2>
                </div>
              </div>
            }
            {currentStep>4 &&
              <div className="flex flex-col h-96 justify-center items-center">
                <img src={thankyou} className="w-13 h-13" alt="" />
                <h2 className="text-3xl font-bold my-2 lg:text-4xl" style={{color:"hsl(213, 96%, 18%)"}}>Thank you!</h2>
                <h2 className='text-center text-lg font-medium' style={{color:'hsl(231, 11%, 63%)'}}>Thanks for confirming your subscription!We hope you have fun using our platform.If you ever need our support,please feel free to email us at support@loremgaming.com</h2>
                
              </div>
            }
            <div className="absolute hidden lg:flex  bottom-0 w-full   justify-between items-center  bg-white h-16">
              {currentStep!=1 && currentStep<5 &&
                <div className="">
                  <button className="font-semibold" onClick={()=>{stepIncrementer(-1)}} style={{color:"hsl(231, 11%, 63%)"}}>go back</button>
                </div>
              }
              <button className={`${currentStep>4 ? "hidden":"block"} py-2 px-4 rounded font-semibold absolute right-12`} onClick={()=>{stepIncrementer(1)}} style={{backgroundColor:"hsl(213, 96%, 18%)",color:"white"}}>{currentStep==4?"Confirm":"Next Step"}</button>
            </div>
              </div>
          
        </div>
      </div>
      {currentStep<5 &&
        <div className="absolute  bottom-0 w-full flex lg:hidden justify-between items-center px-5 bg-white h-16">
            {currentStep!=1 && currentStep<5 &&
              <div className="">
                <button className="font-semibold" onClick={()=>{stepIncrementer(-1)}} style={{color:"hsl(231, 11%, 63%)"}}>go back</button>
              </div>
            }
            <button className={`${currentStep>4?"hidden":"block"} py-2 px-4 rounded font-semibold absolute right-4`} onClick={()=>{stepIncrementer(1)}} style={{backgroundColor:"hsl(213, 96%, 18%)",color:"white"}}>{currentStep==4?"Confirm":"Next Step"}</button>
        </div>
      }
      
    </div>
    </>
  )
}

export default App
