 "use client";
import {createContext,useContext,useEffect,useState} from "react";
export type Workout={id:string|number;name:string;title?:string;category?:string|string[];muscle?:string|string[];equipment?:string|string[];duration?:number|string;calories?:number|string;rating?:number|string;difficulty?:string;sets?:number|string;reps?:string;image?:string;thumbnail?:string;description?:string;instructions?:string[]};
type Ctx={plan:Workout[];saved:Workout[];done:(string|number)[];addPlan:(w:Workout)=>boolean;addSaved:(w:Workout)=>void;removePlan:(id:string|number)=>void;removeSaved:(id:string|number)=>void;toggleDone:(id:string|number)=>void};
const PlanContext=createContext<Ctx|null>(null);
export function PlanProvider({children}:{children:React.ReactNode}) {
 const [plan,setPlan]=useState<Workout[]>([]),[saved,setSaved]=useState<Workout[]>([]),[done,setDone]=useState<(string|number)[]>([]);
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{setPlan(JSON.parse(localStorage.getItem("fitlog-plan")||"[]"));setSaved(JSON.parse(localStorage.getItem("fitlog-saved")||"[]"));setDone(JSON.parse(localStorage.getItem("fitlog-done")||"[]"));}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready){localStorage.setItem("fitlog-plan",JSON.stringify(plan));localStorage.setItem("fitlog-saved",JSON.stringify(saved));localStorage.setItem("fitlog-done",JSON.stringify(done));}},[plan,saved,done,ready]);
 const addPlan=(w:Workout)=>{if(plan.some(x=>String(x.id)===String(w.id)))return false;if(plan.length>=5)return false;setPlan(p=>[...p,w]);return true};
 const addSaved=(w:Workout)=>setSaved(p=>p.some(x=>String(x.id)===String(w.id))?p:[...p,w]);
 const removePlan=(id:string|number)=>{setPlan(p=>p.filter(x=>String(x.id)!==String(id)));setDone(p=>p.filter(x=>String(x)!==String(id)))};
 const removeSaved=(id:string|number)=>setSaved(p=>p.filter(x=>String(x.id)!==String(id)));
 const toggleDone=(id:string|number)=>setDone(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
 return <PlanContext.Provider value={{plan,saved,done,addPlan,addSaved,removePlan,removeSaved,toggleDone}}>{children}</PlanContext.Provider>
}
export function usePlan(){const c=useContext(PlanContext);if(!c)throw new Error("usePlan must be used inside PlanProvider");return c}
