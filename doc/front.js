const LAYER = {
  layer: {
    A0001() {
      $.mioLayer({
        type: 'layer',
        title: "오류코드 안내",
        content:'#LY-A0001',
        fn: {
          cancel(ins) {
            ins.fn.close(ins);
          },
          confirm(ins) {
            LAYER.confirm.B0003();
          },
        }
      });
    },
    
    A0002() {
      $.mioLayer({
        type: 'layer',
        title: "버튼 영역 자바스크립트 옵션으로 처리",
        content:'#LY-A0002',
        buttons: [
          `<button type="button" class="btn secondary" data-action="close">닫기</button>`,
          `<button type="button" class="btn primary" data-action="close">확인</button>`,
        ],
      });
    },

    A0003() {
      $.mioLayer({
        type: 'layer',
        title: '마크업 없이 호출',
        content: '모달 내용에 텍스트만 들어가는 경우 마크업 없이 JS 옵션만으로 모달 생성 가능!',
        buttons: [
          `<button type="button" class="btn primary" data-action="close">닫기</button>`,
        ],
      });
    },
  },


  confirm: {
    B0001() {
      $.mioLayer({
        type: 'confirm',
        title: "컨펌 타입",
        content:'#LY-A0001',
        fn: {
          confirm(ins) {
            LAYER.alert.C0001();
          },
          cancel(ins) {
            ins.fn.close(ins);
          }
        }
      });
    },
    B0002() {
      $.mioLayer({
        type: 'confirm',
        title: "컨펌 타입 - 버튼 영역 자바스크립트 옵션으로 처리",
        content:'#LY-B0002',
        buttons: [
          `<button type="button" class="btn secondary" data-action="close">닫기</button>`,
          `<button type="button" class="btn primary" data-action="close">확인</button>`,
        ],
        fn: {
          confirm(ins) {
            LAYER.confirm.A0003();
          },
          cancel(ins) {
            ins.fn.close(ins);
          }
        }
      });
    },
    B0003() {
      $.mioLayer({
        type: 'confirm',
        title: '마크업 없이 호출',
        content: `모달 내용에 텍스트만 들어가는 경우 마크업 없이 JS 옵션만으로 모달 생성 가능!`,
        buttons: [
          `<button type="button" class="btn primary" data-action="close">닫기</button>`,
        ],
      });
    },
    B0004() {
      $.mioLayer({
        type: 'confirm',
        displayTitle: false,
        displayCloseButton: false,
        content: '타이틀 없는 컨펌 타입',
        buttons: [
          `<button type="button" class="btn primary" data-action="close">닫기</button>`,
        ],
      });
    },
    B0005() {
      $.mioLayer({
        type: 'confirm',
        title: '하단 버튼 없는 컨펌 타입',
        displayBottomButtons: false,
        content: 'confirm popup',
      });
    },
  },


  alert: {
    C0001() {
      $.mioLayer({
        type: 'alert',
        content: `검색 결과가 없습니다.`,
      });
    },
    C0002() {
      $.mioLayer({
        type: 'alert',
        displayTitle: false,
        displayCloseButton: false,
        content: `검색 결과가 없습니다.<br><strong class="fc_red">타이틀</strong>도 없습니다.`,
      });
    }
  }
  
}

window.addEventListener('load', ()=>{
  document.querySelector("#LY-A0001-BTN").addEventListener("click", LAYER.layer.A0001);
  document.querySelector("#LY-A0002-BTN").addEventListener("click", LAYER.layer.A0002);
  document.querySelector("#LY-A0003-BTN").addEventListener("click", LAYER.layer.A0003);

  document.querySelector("#LY-B0001-BTN").addEventListener("click", LAYER.confirm.B0001);
  document.querySelector("#LY-B0002-BTN").addEventListener("click", LAYER.confirm.B0002);
  document.querySelector("#LY-B0003-BTN").addEventListener("click", LAYER.confirm.B0003);

  document.querySelector("#LY-B0004-BTN").addEventListener("click", LAYER.confirm.B0004);
  document.querySelector("#LY-B0005-BTN").addEventListener("click", LAYER.confirm.B0005);
  
  document.querySelector("#LY-C0001-BTN").addEventListener("click", LAYER.alert.C0001);
  document.querySelector("#LY-C0002-BTN").addEventListener("click", LAYER.alert.C0002);
});

// code
window.addEventListener('DOMContentLoaded', ()=>{
  const $pre = document.querySelectorAll('pre');

  $pre.forEach( el => {
    const $code = el.querySelector('code');
    $code.textContent = String($code.innerHTML).trim();
  })
})
