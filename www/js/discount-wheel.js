document.addEventListener('DOMContentLoaded', function() {

  // to let discount wheel modal be on top
  const resultRow = document.querySelector('.bill-result__row');
  $('#modal-discount-wheel').on('show.bs.modal', function (event) {
    resultRow.innerHTML.length ? resultRow.style.zIndex = 'auto' : '';
  })
 

  var wheelSection = document.querySelector("#discount-wheel-section");
  wheelSection.classList.add("hidden");
  
  var spinButton = document.querySelector("#btn-spin");
  var discountResultEntry = document.querySelector("#discount-result-entry");
  var discountResultInfo = document.querySelector("#discount-result-info");
  var discountResultText = document.querySelector("#discount-result-text");
  
  var theme = ['#64B3F7', '#FFE89D', '#FFD578', '#FFA727', '#FF6A51', '#E84F35'];
  var wheelSectors = ["100 грн", "150 грн", "200 грн", "50%", "30%", "10%"];

  var wheel;

  const discountWheelWrapper = document.querySelector('#discount-wheel-wrapper');
  const discountResultWrapper =  document.querySelector('#discount-result-wrapper');
  
  spinButton.onclick = function() {
    if (wheel.spin()) {
      discountResultEntry.innerText = "";
      // spinButton.style.visibility = "hidden";
      spinButton.setAttribute('disabled', 'disabled');
    }
  }

  discountWheel();
  
  loop();
  function loop() {
    if (wheel != null) {
      wheel.update();
    }
    
    requestAnimationFrame(loop);
  }
  
  function discountWheel() {

    wheel = new Wheel(wheelSectors, theme);
    
    wheel.spinDone = function() {
      
      discountResultEntry.innerText = '-' + wheel.getCurrentEntry();
      // spinButton.removeAttribute('disabled');
      const discountResultIndex = wheelSectors.indexOf(wheel.getCurrentEntry()) + 1;
      const discountResultTextAttr = discountResultInfo.getAttribute('data-result-info-' + discountResultIndex);
      const discountResultTextBefore = discountResultInfo.dataset.resultBefore;
      discountResultText.innerText = discountResultTextAttr;

      if ([4, 5, 6].includes(discountResultIndex)) {
        discountResultEntry.innerText = discountResultTextBefore + ' ' + '-' + wheel.getCurrentEntry();
      }

      setTimeout(function() {
        discountWheelWrapper.classList.add('hidden');
        discountResultWrapper.classList.remove('hidden');
      }, 600);
    }
    

    spinButton.removeAttribute('disabled');
    
    wheelSection.classList.remove("hidden");
    
    discountResultEntry.innerText = "";
    
    document.querySelector('#discount-wheel-container').ontouchmove = e => {
    // document.ontouchmove = e => {
      e.preventDefault();
    }
  }
  
  function Wheel(entries, colorScheme) {
    this.entries = entries;
    this.colorScheme = colorScheme;
    
    if (this.entries.length % this.colorScheme.length == 1) {
      this.colorScheme.push(this.colorScheme[this.colorScheme.length - 2]);
    }
    
    this.size = 300;
    
    this.isSpinning = false;
    this.friction = 2;
    this.angle = Math.PI / this.entries.length;
    this.angularVelocity = 0;
    this.dt = 1 / 60;
    
    this.instant = false;
  
    this.svg = createElement("svg", document.querySelector("#discount-wheel-container"));
    this.svg.setAttribute("viewBox", `0 0 ${this.size} ${this.size}`);
    this.svg.setAttribute("width", "319");
    this.svg.setAttribute("height", "319");
  
    this.group = createElement("g", this.svg);
    this.group.style.transformOrigin = "center";
  
    this.background = createElement("circle", this.group);
    this.background.setAttribute("cx", this.size / 2);
    this.background.setAttribute("cy", this.size / 2);
    this.background.setAttribute("r", this.size * 0.485);
    this.background.setAttribute("fill", "rgba(255, 255, 255, 0.8)");
  
    for (var i = 0; i < this.entries.length; i++) {
      var arc = createElement("path", this.group);
      arc.setAttribute("fill", this.colorScheme[i % this.colorScheme.length]);
  
      var radius = this.size * 0.47;
      var angle = -i / this.entries.length * Math.PI * 2;
      var offset = Math.PI * 2 / this.entries.length;
  
      setArc(arc, this.size / 2, this.size / 2, radius, angle, offset);
  
      var text = createElement("text", this.group);
      text.classList.add("entryText");
      text.setAttribute("alignment-baseline", "middle");
      text.style.transform = `translate(${this.size / 2}px, ${this.size / 2}px) rotate(${angle - offset / 2 + Math.PI}rad) translateX(${-radius * 0.95}px)`;
      
      var textContent = this.entries[i];
      if (textContent.length >= 15) {
        textContent = textContent.slice(0, 12) + "...";
      }
      text.textContent = textContent;
    }

    this.svgArrow = createElement("svg", document.querySelector("#discount-wheel-container"));
    this.svgArrow.setAttribute("viewBox", `0 0 40 32`);
    this.svgArrow.setAttribute("width", "40");
    this.svgArrow.setAttribute("height", "32");
    this.svgArrow.classList.add('discount-wheel-arrow');
  
    var arrow = createElement("path", this.svgArrow);
    arrow.setAttribute("fill", "#172A3A");
    arrow.setAttribute("d", 'M37.2945 13.1824C39.9208 14.1428 39.9209 17.8572 37.2945 18.8176L4.03026 30.9808C2.07285 31.6965 -1.45329e-06 30.2474 -1.36219e-06 28.1633L-2.98844e-07 3.83674C-2.07742e-07 1.75259 2.07285 0.303462 4.03025 1.0192L37.2945 13.1824Z');
    
    // this.destroy = function() {
    //   this.svg.parentNode.removeChild(this.svg);
    // }
    
    this.spin = function() {
      if (!this.isSpinning) {
        this.isSpinning = true;
        this.angularVelocity = 10 + (Math.random() - 0.5) * 5;
        
        return true;
      }
      
      return false;
    }
    
    this.update = function() {
      if (this.isSpinning) {
        do {
          this.angularVelocity -= Math.min(Math.abs(this.angularVelocity) / this.dt, this.friction) * Math.sign(this.angularVelocity) * this.dt;
          this.angle += this.angularVelocity * this.dt;
  
          if (Math.abs(this.angularVelocity) < 0.01 && this.isSpinning) {
            this.isSpinning = false;
            this.spinDone();
          }
        } while (this.isSpinning && this.instant);
      }
  
      this.group.style.transform = `rotate(${this.angle - Math.PI / 2}rad)`;
    }
    
    this.getCurrentEntry = function() {
      return this.entries[Math.floor(this.angle % (Math.PI * 2) / (Math.PI * 2) * this.entries.length)];
    }
    
    this.spinDone = function() {}
  }
  
  function setArc(element, x, y, radius, startAngle, offset) {
    offset = Math.PI * 2.0001 - (offset % (Math.PI * 2));
    var d = [
      "M", x + Math.cos(startAngle) * radius, y + Math.sin(startAngle) * radius,
      "A", radius, radius, 0, offset % (Math.PI * 2) > Math.PI ? 0 : 1, 0, x + Math.cos(startAngle + offset) * radius, y + Math.sin(startAngle + offset) * radius,
      "L", x, y,
      "Z"
    ].join(" ");
    element.setAttribute("d", d);
  }
  
  function createElement(type, parent) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", type);
    if (parent != null) {
      parent.appendChild(element);
    }
    
    return element;
  }

})