import {createClient} from '@supabase/supabase-js';
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SECRET_KEY,{auth:{persistSession:false}});
for(const table of ['recruitment_applications','recruitment_reviews','recruitment_staff']) {
 const result=await db.from(table).select('*',{count:'exact',head:true});
 if(result.error) throw new Error(result.error.message);
 console.log(table+': '+result.count+' rows');
}
const {data,error}=await db.auth.admin.listUsers({perPage:100});
if(error) throw error;
console.log('Temporary test users remaining: '+data.users.filter(u=>u.email?.startsWith('optica-test-')&&u.email?.endsWith('@example.test')).length);
