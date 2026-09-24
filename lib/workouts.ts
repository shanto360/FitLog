import {Workout} from "@/context/PlanContext";
export const API="https://api.abcz.workers.dev/api/fitlog";
export async function getWorkouts():Promise<Workout[]>{
 const res=await fetch(API,{cache:"no-store"});if(!res.ok)throw new Error("Could not load workouts");
 const data=await res.json();const rows=Array.isArray(data)?data:(data.data||data.workouts||[]);
 return rows.map((x:any,i:number)=>({...x,id:x.id??x._id??i+1,name:x.name??x.title??x.exercise??"Workout",category:x.category??x.muscleGroup??x.muscle??"Training",equipment:x.equipment??"Bodyweight",duration:Number(x.duration??x.durationMinutes??25),calories:Number(x.calories??180),rating:Number(x.rating??4.8),image:x.image??x.imageUrl??x.thumbnail??"",description:x.description??"",instructions:x.instructions??[]}));
}
export const nameOf=(w:Workout)=>String(w.name||w.title||"Workout").toUpperCase();
export const listOf=(v:any):string[]=>Array.isArray(v)?v.map(String):String(v||"Training").split(/[,|]/).map(s=>s.trim()).filter(Boolean);
export const imageOf=(w:Workout)=>w.image||w.thumbnail||`https://images.unsplash.com/photo-${String(w.id).length%2?"1534438327276-14e5300c3a48":"1583454110551-21f2fa2afe61"}?auto=format&fit=crop&w=1000&q=80`;
