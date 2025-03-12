let $ = {};

(function(){
  "use strict";

  const _w = window;

  $.mioLayer = function(options){
    if (typeof options !== 'object') return;
    return _w.miolayer(options);
  }

  _w.miolayer = function(options){
    options.fn = { ..._w.miolayer.options.fn, ...options.fn };
    const pluginOptions = { ..._w.miolayer.options, ...options };
    const instance = new _w.mioLayer(pluginOptions);
    _w.miolayer.instances.push(instance);

    return instance;
  };

  _w.mioLayer = function(options){
    Object.assign(this, options);
    this.init();
  };

  _w.mioLayer.prototype = {
    init() {
      this.timer = 210; // CSS animation
      this.$container = document.querySelector('[data-scroll-body]');
      this.open();
    },
    open() {
      this.buildHTML();

      // other modal check
      if (miolayer.instances.length !== 0) {
        const $previousElement = this.$miolayer.previousElementSibling;
        this.$layer.focus();
        $previousElement.setAttribute("aria-hidden", true);

      } else {
        
        this.$layer.focus();
        this.$container.setAttribute("aria-hidden", true);
        if (this.scrollDisabled) this.setScrollDisabled(true);
      }
    },
    buildHTML() {
      // create DOM element
      const $template = document.createElement('div');
      $template.innerHTML = this.template.trim();
      this.$el = $template.firstChild;
      document.body.appendChild(this.$el);

      this.$miolayer = this.$el.closest('.miolayer');
      this.$layer = this.$el.querySelector('.ly_in');
      this.$hd = this.$el.querySelector('.ly_hd');
      this.$title = this.$el.querySelector('.ly_hd h1');
      this.$con = this.$el.querySelector('.ly_con');
      this.$closeBtn = this.$el.querySelector('.btn_modal_close');
      this.scrollY = this.$container.scrollTop;
      this.$lastFocusedElement = document.activeElement;
      this.lastFocusedId = this.$lastFocusedElement.getAttribute("id");

      this.setContent(); // options contents settings
      this.setButton();

      // title setting
      const title = (this.title == '') ? "알림" : this.title;
      this.$title.innerHTML = title;
      this.$layer.setAttribute("aria-label", title);

      // class setting
      this.$miolayer.classList.add(this.type);

      // id setting
      try {
        const checkContent = document.querySelector(this.content);
        if (checkContent) {
          this.$miolayer.setAttribute("id", `${this.content}-MD`);
        }
      } catch (e) {
        this.$miolayer.setAttribute("id", `MIOLAYER-MD`);
      }

      if(this.displayTitle === false) this.$layer.classList.add("no-hd");
      if(this.displayCloseButton === false) this.$layer.classList.add("no-close");
      if(this.displayBottomButtons === false) this.$layer.classList.add("no-bottom-buttons");
      
      this.$lastFocusedElement.classList.add("active");
      this.$layer.setAttribute("tabindex", 0);

      // aria-hidden
      setTimeout(()=>{
        this.$container.setAttribute("aria-hidden", true);
      }, this.timer);
      this.$el.setAttribute("aria-hidden", false);

      this.setEvent();
    },
    setContent() {
      const _this = this;
      let $html = '';

      try {
        const $content = document.querySelector(_this.content);
        $html = $content.innerHTML;
        _this.originHTML = $content.innerHTML;

        $content.innerHTML = '';

      } catch (e) {
        $html = `<div class="ly_cnt"><div class="section">${_this.content}</div></div>`;
      }

      if (this.type === 'alert') {
        $html += `
          <div class="ly_btn">
            <div class="btn_area">
              <button type="button" class="btn primary" data-action="close">확인</button>
            </div>
          </div>
        `;
      }

      _this.$con.innerHTML = $html;
    },
    setButton() {
      if (!this.displayBottomButtons) {
        if (this.$btns) this.$btns.remove();
      }
      
      if (this.buttons.length && this.displayBottomButtons ) {
        let $buttons = ``;
        this.buttons.forEach(btn => { $buttons += btn });

        const $btnArea = document.createElement('div');
        $btnArea.classList.add('ly_btn');
        $btnArea.innerHTML = `<div class="btn_area">${$buttons}</div>`;

        this.$con.appendChild($btnArea);
      }
    },
    setEvent() {
      const _this = this;

      const $closeButton = _this.$el.querySelectorAll("[data-action='close']");
      $closeButton.forEach( el => {
        el.addEventListener("click", ()=>{
          _this.close(_this);
        });
      });

      const $confirmButton = _this.$el.querySelectorAll("[data-action='confirm']");
      $confirmButton.forEach( el => {
        el.addEventListener("click", ()=>{
          _this.fn.confirm(_this);
        });
      });

      const $cancelButton = _this.$el.querySelectorAll("[data-action='cancel']");
      $cancelButton.forEach( el => {
        el.addEventListener("click", ()=>{
          _this.fn.cancel(_this);
        });
      });
      
      // dim click action
      const $dim = _this.$el.querySelector(".col_dim");
      $dim.addEventListener("click", () => {
        if( _this.dimAction === true ){
          _this.close(_this);
        }
      });

      _this.$layer.addEventListener("keydown", (e)=>{
        // tab
        if (e.key === 'Tab') {
          if (e.target === _this.$closeBtn && !e.shiftKey) {  
            _this.$layer.focus();
            e.preventDefault();
          }

          if (e.target === _this.$layer && e.shiftKey) {
            _this.$closeBtn.focus();
            e.preventDefault();
          }
        }

        // esc
        if (e.key === 'Escape') {
          _this.close();
          e.preventDefault();
        }
      })
    },
    close(_this) {
      _this.$miolayer.classList.remove("open");
      _this.$miolayer.classList.add("close");
      _this.$lastFocusedElement.classList.remove("active");

      setTimeout(()=>{
        _this.$miolayer.removeAttribute("aria-hidden");
        
        // other modal check
        if (miolayer.instances.length > 1) {
          const $previousElement = _this.$miolayer.previousElementSibling;
          $previousElement.setAttribute("aria-hidden", false);
          
        } else {
          _this.$container.removeAttribute('aria-hidden');
          if (_this.scrollDisabled) _this.setScrollDisabled(false);
        }

        try {
          document.querySelector(_this.content).innerHTML = _this.originHTML;
        } catch (e) {}

        _this.$lastFocusedElement.focus();
        _this.$el.remove();

        _w.miolayer.instances.find(function(o, i){
          if(o == _this){
            _w.miolayer.instances.splice(i, 1);
          }
        });

      }, _this.timer);
    },
    setScrollDisabled(Boolean) {
      if (Boolean) {
        this.$container.setAttribute("data-scroll", "disabled");
        this.$container.style.top = `${this.scrollY * -1}px`;

      } else {
        this.$container.setAttribute('data-scroll', 'wait'); // scroll-behavior: initial;
        this.$container.style.top = '';
        this.$container.scrollTop = this.scrollY;
        this.$container.removeAttribute('data-scroll');
      }
    }
  };

  _w.miolayer.instances = [];
  _w.miolayer.options = {
    originHTML: '',
    template: `
      <div class="miolayer open">
        <div class="row">
          <div class="col">
            <div class="col_dim"></div>
            <div class="ly_in" role="dialog" aria-label="알림" aria-modal="true">
              <div class="ly_hd"><h1 class="modal_h1">알림</h1></div>
              <div class="ly_con"></div>
              <button type="button" class="btn_modal_close" data-action="close"><span class="hidden">레이어 닫기</span></button>
            </div>
          </div>
        </div>
      </div>
    `,
    type: 'layer',
    title: '알림',
    displayTitle: true,
    displayCloseButton: true,
    dimAction : true,
    content: 'content',
    displayBottomButtons: true,
    buttons: [],
    fn: {
      confirm(ins) {
        // data-action="confirm" click to execute
      },
      cancel(ins) {
        // data-action="cancel" click to execute
      },
      close(ins) {
        Object.getPrototypeOf(ins).close(ins);
      }
    },
    scrollDisabled: true,
  };
})();
