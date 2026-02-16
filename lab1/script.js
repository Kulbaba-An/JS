
    let a,b,hypotenuse,angle,alpha,beta;
    a = b = hypotenuse = angle = alpha = beta = null;

    console.log(
        `Інструкція: 
        Можливі параметри: 
        leg - катет
        hypotenuse - гіпотенуза
        adjacent angle - прилеглий до катета кут
        opposite angle - протилежний до катета кут
        angle - один з двох гострих кутів (коли задана гіпотенуза)
        
        Приклади: 
        triangle(4, "leg", 8, "hypotenuse");
        triangle(10, "leg", 40, "opposite angle")

        !!!При вказанні величин кутів використовувати градуси;
        
        !Заборонено:
        - відємні значення
        - нульові значення 

        Приклади:
        triangle(0, "hypotenuse", -88, "leg");
        triangle(8, "hyp", 4, "leg1");
        `
) 

    function setParametrs(num, param){
        
        switch (param) {
         case "leg":
            if(a === null){ 
                a = num;
            }
            else{
                b = num;
            }
            break;
         case "hypotenuse":
            hypotenuse = num;
            break;
         case "adjacent angle":
            beta = num;
            break;
         case "opposite angle":
            alpha =  num;
            break;
         case "angle":
            angle =  num;
            break;
        default:
            console.log('Parameter with name "' + param+ '" does not exist, check the parameters');
            break;
        }
    }
    function checkParamtrsIncorect(a,b,hypotenuse,angle,alpha,beta){
     
        if((!checkParam(a)) ||
           (!checkParam(b)) ||
           (!checkParam(hypotenuse)) ||
           (!checkAngle(angle)) ||
           (!checkAngle(alpha)) ||
           (!checkAngle(beta))  ){
            return true;
        }
        else if( !checkLegHypotenuse(a,hypotenuse) || !checkLegHypotenuse(b,hypotenuse)  ){
            return true;
        }
        else if(!checkAngle(angle) || !checkAngle(alpha) || !checkAngle(beta)){
            return true;
        }
        return false;
    }
    function checkAngle(p){
        return p == null ||(p < 90 && p != null);
    }
    function checkParam(p){
        return p == null || (p > 0 && p != null);
    }
    function checkLegHypotenuse(paramLeg, paramHypotenuse){
        if(paramLeg == null || paramHypotenuse == null  || (paramHypotenuse > paramLeg))
        return true;
    }
    function checkSides(a,b,c){
        if(a +b > c && a + c > b && b + c > a){
            return true;
        }
    }

    function triangle(num1, param1, num2, param2){

        a = b = hypotenuse = angle = alpha = beta = null
        setParametrs(num1, param1);
        setParametrs(num2, param2);
        //основна перевірка значень 
        if (checkParamtrsIncorect(a,b,hypotenuse,angle,alpha,beta)){
            console.log("Incorrect parameter values")
            console.log("failed")
            return;
        }
        else if(a != null && b != null){
            hypotenuse = Math.sqrt(a*a + b*b) ;
            alpha = Math.asin(a/hypotenuse) *(180/Math.PI);
            beta = Math.asin(b/hypotenuse) *  (180/Math.PI);}

        else if(a != null && hypotenuse != null){
            
            b = Math.sqrt(hypotenuse*hypotenuse - a*a);
            alpha = Math.asin(a/hypotenuse) * (180/Math.PI);
            beta = Math.asin(b/hypotenuse) * (180/Math.PI);
        }
        //катет + прилеглий
        else if(a != null && beta != null){
            hypotenuse = a/ Math.cos(beta/ (180/Math.PI));
            b = Math.sqrt(hypotenuse*hypotenuse - a*a);
            alpha = 90 - beta;

        }
        // катет протилежний
        else if(a != null && alpha != null){
            hypotenuse = a/ Math.sin(alpha/ (180/Math.PI));
            b = Math.sqrt(hypotenuse*hypotenuse - a*a);
            beta = 90 - alpha;
        }
        else if(hypotenuse != null && angle != null){
            beta = angle;
            alpha = 90 - angle;
            a = hypotenuse* Math.sin(alpha/ (180/Math.PI));
            b = hypotenuse* Math.sin(beta/ (180/Math.PI))
        }
        else{
            console.log("failed")
            return;   
        }
        if(!checkSides(a,b,hypotenuse)){
            console.log("failed")
            return;
        }

        console.log("a = " + a + "\nb = " + b +  "\nc = ",hypotenuse,   "\nalpha = ",alpha,   "\nbeta = ",beta  )
        console.log("success")
        }

