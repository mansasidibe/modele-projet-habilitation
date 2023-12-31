			function testNum_WFW(e, t, d) {

			    //on cr�e le tableau des touches autoris�es
			    var toucheOk =
			        new Array(

			            48, //0
			            49, //1
			            50, //2
			            51, //3
			            52, //4
			            53, //5
			            54, //6
			            55, //7
			            56, //8
			            57, //9
			            8 //<--
			        );

			    //Fonction qui renvoie true si le tableau Arr contient Val
			    function in_array(Arr, Val) {
			        for (i = 0; i < Arr.length; i++) {
			            if (Arr[i] == Val)
			                return true;
			        }
			        return false;
			    }
			    //On remplace les virgules par des points
			    t.value = t.value.replace(',', '.');
			    //En fonction du naviguateur, on assigne la valeur de la touche
			    if (e.keyCode == 0) //FIREFOX...
			    {
			        var key = e.which;
			        var firefox = true;
			    } else //IE....
			    {
			        var key = e.keyCode;
			        var ie = true;
			    }

			    //On va rechercher si deux points cons�cutifs ont �t� utilis�s
			    var longChar = t.value.length;
			    var lastChar = t.value.charAt(longChar - 1); //On r�cup�re le dernier char
			    if ((lastChar == '.') && ((key == 46) || (key == 44))) var point = true;


			    // Detection du curseur

			    if (ie == true) //On est sous IE
			    {
			        function getSelection(objIE) {
			            if (objIE.setSelectionRange)
			                return objIE.value.substring(objIE.selectionStart, objIE.selectionEnd);
			            else if (document.selection) {
			                objIE.focus();
			                return document.selection.createRange().text;
			            }
			        }

			        function getSelectionStart(o) {
			            if (typeof o.selectionStart != 'undefined')
			                return o.selectionStart;

			            // IE Support
			            o.focus();
			            var range = o.createTextRange();
			            range.moveToBookmark(document.selection.createRange().getBookmark());
			            range.moveEnd('character', o.value.length);
			            return o.value.length - range.text.length;
			        }


			        function getSelectionEnd(objIE) {
			            if (typeof objIE.selectionStart != 'undefined') {
			                return objIE.selectionStart;
			            }
			            objIE.focus();
			            var range = objIE.createTextRange();
			            range.moveToBookmark(document.selection.createRange().getBookmark());
			            range.moveStart('character', -objIE.value.length);
			            return range.text.length;
			        }

			        function replaceSelection(objIE, str, keep) {
			            objIE.focus();

			            var start = objIE.getSelectionStart();
			            var stop = objIE.getSelectionEnd();
			            var end = start + str.length;
			            var scrollPos = objIE.scrollTop;

			            objIE.value = objIE.value.substring(0, start) + str + objIE.value.substring(stop);
			            if (keep) objIE.setCaretPos(start, end);
			            else objIE.setCaretPos(end);
			            objIE.scrollTop = scrollPos;
			        }



			        var cursStart = getSelectionStart(t);
			        var cursEnd = getSelectionEnd(t);


			    }

			    if (firefox == true) //on est sous firefox
			    {
			        var cursStart = t.selectionStart;
			        var cursEnd = t.selectionEnd;
			    }


			    //Contr�les :
			    if (d) {
			        //On va chercher la position du '.'
			        var posPoint = t.value.lastIndexOf('.');
			        if (posPoint != -1) {
			            var lgaftP = t.value.substring(posPoint, longChar);
			            var longP = lgaftP.length;
			        }

			        //Si la valeur est plus importante que 'd' et que
			        //le curseur est apr�s le point
			        if ((longP > d) && (key != 8) && (cursStart > (posPoint)))
			            var maxDec = true; //On bloque
			        else
			            var maxDec = false;
			    }
			    //si on s�lectionne avec la souris un chiffre ou plusieurs
			    if (cursStart < cursEnd) {
			        maxDec = false;
			    }
			    //On autorise les fleches
			    if ((key == 37) || (key == 39))
			        maxDec = false;

			    //On compte le nombre de points
			    var nbrPoint = 0;
			    for (i = 0; i < t.value.length; i++) //On parcours la valeur
			    {
			        if (t.value.charAt(i) == '.')
			        //On incr�mente
			            nbrPoint++;
			    }

			    if ((nbrPoint == 1) && ((key == 44) || (key == 46))) maxDec = true;

			    //On teste les clefs ASCII utilis�es et les conditions
			    if ((!in_array(toucheOk, key)) || (point == true) || (maxDec == true)) {
			        if (e.which == 0) e.returnValue = false;
			        return false;
			    } else return true;

			}