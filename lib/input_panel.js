

function InputPanel(idInput){

    
    this.eleRange=document.getElementById(idInput)
    this.eleText=document.getElementById(idInput+"_text")




    this.init=function(){
       
        

        this.eleRange.th=this
        this.eleRange.addEventListener("input",this.onChange)
        this.eleRange.addEventListener("focus",this.onFocus)
        this.eleText.th=this
        this.eleText.addEventListener("input",this.onChange)
        this.eleText.addEventListener("focusin",this.onFocusIn)
        this.eleText.addEventListener("focusout",this.onFocusOut)


        this.onChangeElement(this.eleRange)

    }

    

    this.setFloat=function(value){
        this.eleRange.value=value
        
        this.eleText.value=Math.round(value * 100) / 100
    }
    
    this.getFloatValue=function(){
        return parseFloat(this.eleRange.value)
    }

    this.onFocusIn=function(e){

        if(e.target.th){
            e.target.th.onFocusElementIn(e,e.target)
        }
        
    }


    this.onFocusElementIn=function(e,ele){

        
        if(ele){
            
            ele.inFocus=true

        }
    }

    this.onFocusOut=function(e){

        if(e.target.th){
            e.target.th.onFocusElementOut(e,e.target)
        }
        
    }

    this.onFocusElementOut=function(e,ele){

        if(ele){
            ele.inFocus=false

        }
    }


    this.onChangeElement=function(ele){

        
        
        if(ele){
            if(ele==this.eleRange && this.eleText){
                
                this.eleText.value=this.eleRange.value
            }

            if(ele==this.eleText && this.eleText.inFocus && this.eleRange){
                this.eleRange.value=this.eleText.value
            }

        }
    }
    

    this.onChange=function(e){
        
        if(e.target.th){
            e.target.th.onChangeElement(e.target)
        }
        
    }

    this.init()
}
