/* 공통: BGM 끄기/켜기 버튼. 영상 재생 시 자동 정지 */
(function(){
  var btn=document.querySelector('.bgm');if(!btn)return;
  var a=new Audio('assets/bgm.mp3');a.loop=true;a.volume=.35;
  var on=false;
  try{on=sessionStorage.getItem('bgm')!=='off'}catch(e){}
  function label(){btn.textContent=(on&&!a.paused)?'BGM 끄기':'BGM 켜기'}
  function set(v){on=v;try{sessionStorage.setItem('bgm',v?'on':'off')}catch(e){}
    if(v){var p=a.play();if(p&&p.catch)p.catch(function(){})}else a.pause();label()}
  btn.addEventListener('click',function(){set(!(on&&!a.paused))});
  window.addEventListener('bgm:pause',function(){a.pause();label()});
  a.addEventListener('error',function(){btn.style.display='none'});
  a.addEventListener('play',label);a.addEventListener('pause',label);
  if(on){var p=a.play();if(p&&p.catch)p.catch(function(){document.addEventListener('click',function f(){document.removeEventListener('click',f);if(on)a.play().catch(function(){})},{once:true})})}
  label();
})();
