/* Firebase를 MEGO MOVE 저장소 형식으로 감싸는 코드 */
const MEGO_DOMAIN='@mego-move.app';
function makeMegoDB(f){
 const wrapSnap=s=>({id:s.id,exists:s.exists(),data:()=>s.data()});
 return {
  doc:p=>({get:async()=>wrapSnap(await f.getDoc(f.doc(f.fs,p))),set:d=>f.setDoc(f.doc(f.fs,p),d),delete:()=>f.deleteDoc(f.doc(f.fs,p))}),
  collection:c=>({add:d=>f.addDoc(f.collection(f.fs,c),d),limit:n=>({get:async()=>{const q=await f.getDocs(f.query(f.collection(f.fs,c),f.limit(n)));return {docs:q.docs.map(x=>({id:x.id,data:()=>x.data()}))}}})})
 };
}
function makeMegoAuth(f){
 const map=e=>{const c=e&&e.code||'';if(/invalid-credential|wrong-password|user-not-found|invalid-email/.test(c))return {code:'auth'};if(/email-already-in-use/.test(c))return {code:'exists'};if(/operation-not-allowed|configuration-not-found/.test(c))return {code:'setup'};if(/too-many-requests/.test(c))return {code:'many'};return {code:'net'}};
 return {
  signIn:async(id,pw)=>{try{await f.signInWithEmailAndPassword(f.auth,id+MEGO_DOMAIN,pw)}catch(e){throw map(e)}},
  signUp:async(id,pw)=>{try{await f.createUserWithEmailAndPassword(f.auth,id+MEGO_DOMAIN,pw)}catch(e){throw map(e)}},
  signOut:()=>f.signOut(f.auth).catch(()=>{}),
  ready:()=>new Promise(res=>{const un=f.onAuthStateChanged(f.auth,u=>{un();res(u&&u.email?u.email.split('@')[0]:null)})})
 };
}
if(!(window.FIREBASE_CONFIG&&window.FIREBASE_CONFIG.apiKey&&!/여기/.test(window.FIREBASE_CONFIG.apiKey)))window.claude={use:async()=>null};
