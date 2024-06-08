function getElement (selection){
  console.log("getElement is  started");
  console.log(selection);
   const element = document.querySelector(`${selection}`);
   if(element != null){
    return element;
   }
   throw new Error(`Please check relevent "${selection}" class in .html file`);
   console.log("getElement is  ended");
}
class Gallery{
  
    constructor (element){
      console.log("Gallery  constructor is start");
      console.log("element : ",element);
        this.container = element;
        this.list  = [...element.querySelectorAll(".img")];// convert Nodelist to arry
        console.log("list1",this.list);
      // target 
      this.modal = getElement('.modal'); //one element typeof  nodelist 
      this.modalImg = getElement('.main-img');//one element  typeof  nodelist 
      this.imageName = getElement('.image-name');// nodelist 
      this.modalImages = getElement('.modal-images');// nodelist (mutiple images)
      this.closeBtn = getElement('.close-btn');// nodelist 
      this.nextBtn = getElement('.next-btn');// nodelist 
      this.prevBtn = getElement('.prev-btn');// nodelist 
      // Binding the object 
      this.setMainImage= this.setMainImage.bind(this);
      this.closeModal= this.closeModal.bind(this);
      this.nextImage= this.nextImage.bind(this);
      this.prevImage= this.prevImage.bind(this);
      this.chooseImage= this.chooseImage.bind(this);
      // 
      this.container.addEventListener("click",function(e) {
        // self.openModal();
        console.log("container is  started");
        console.log("list2",this.list);
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.list);
        }
        console.log("container is  ended");
      }.bind(this));
      console.log("Gallery is  ended");
    }
    openModal(selectedImage, list) {
       console.log("I am in open model");
         this.setMainImage(selectedImage);
         console.log("selectedImage : ",selectedImage);
         console.log("list3 : ",list);
         this.modalImages.innerHTML = list.map(function (image){
              return `<img src="${image.src}"  title="${image.title}" data-id="${image.dataset.id}" class="${image.dataset.id ===selectedImage.dataset.id? 'modal-img selected':'modal-img'}" alt="" />
              `
         }).join('');
         this.modal.classList.add("open");
         this.closeBtn.addEventListener('click',this.closeModal);
         this.nextBtn.addEventListener('click',this.nextImage);
         this.prevBtn.addEventListener('click',this.prevImage);
         this.modalImages.addEventListener('click',this.chooseImage);
         console.log("open model is ended");
    }
    // Closing Model
    closeModal(){
      console.log(" closeModal is start");
      this.modal.classList.remove("open");
      this.closeBtn.addEventListener('click',this.closeModal);
      this.nextBtn.addEventListener('click',this.nextImage);
      this.prevBtn.addEventListener('click',this.prevImage);
      this.modalImages.addEventListener('click',this.chooseImage);
      console.log("closeModal is ended");
    }
     //  Setting a image
    setMainImage(selectedImage){
      console.log(" setMainImage is start");
      console.log("selectedImage : ",selectedImage);
      console.log("selectedImageSrc : ",selectedImage.src);
      console.log("selectedImageTittle : ",selectedImage.title);
      this.modalImg.src = selectedImage.src;
      this.imageName.textContent = selectedImage.title;
      console.log(" setMainImage is ended");
 }
    //  Next Image
    nextImage() {
      console.log("nextImage is start");
        const selected = this.modalImages.querySelector(".selected");
        console.log("selected : ",selected);
        const next = selected.nextElementSibling ||this.modalImages.firstElementChild;
        console.log("next : ",next);
        next.classList.add("selected");
        selected.classList.remove("selected");
        this.setMainImage(next);
        console.log("nextImage is ended");
    }
    // Previous Image
    prevImage() {
          console.log(" prevImage is start");
          const selected = this.modalImages.querySelector(".selected");
          const prev = selected.previousElementSibling || this.modalImages.firstElementChild;
          selected.classList.remove("selected");
          prev.classList.add("selected");
          this.setMainImage(prev);
          console.log(" prevImage is ended");
    }
    // Choose Image 
    chooseImage(e) {
      console.log("chooseImage is start");
      console.log(e);
      if(e.target.classList.contains("modal-img")){
            const selected = this.modalImages.querySelector("selected");
            selected.classList.remove("selected");
            e.target.classList.add("selected");
            this.setMainImage(e.target);
      }
      console.log("chooseImage is start");
    }
}
const ProfAbhishek = new Gallery(getElement('.ProfAbhishek'));
const DevotionalAbhishek = new Gallery(getElement('.DevotionalAbhishek'));
const AbhishekFamily = new Gallery(getElement('.AbhishekFamily'));
const friends = new Gallery(getElement('.Fastival'));

// console.log(ProfAbhishek);