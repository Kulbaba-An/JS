(function (window) {

    function compare(a, b, asc) {
        if (a === undefined && b === undefined) return false;
        else if (a === undefined) return true;
        else if (b === undefined) return false;
        else if(asc) return a > b;
        else if(!asc) return a < b;
       
    }

   
    //------------------------bubbleSort----------------------------------------------------------
    function bubbleSort(arr, asc = true) {
        let a = [...arr];
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                comparisons++;
                if (compare(a[j], a[j + 1], asc)) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    swaps++;
                }
            }
        }

       console.log( "Comparisons = " + comparisons + " Swaps = "+ swaps );
        return a;
    }

    //------------------------selectionSort----------------------------------------------------------
    
    function selectionSort(arr, asc = true) {
        let a = [...arr];
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < a.length; i++) {
            let idx = i;

            for (let j = i + 1; j < a.length; j++) {
                comparisons++;
                if (compare(a[idx], a[j], asc)) {
                    idx = j;
                }
            }

            if (i !== idx) {
                [a[i], a[idx]] = [a[idx], a[i]];
                swaps++;
            }
        }

        console.log( "Comparisons = " + comparisons + " Swaps = "+ swaps );
        return a;
    }

 
    //--------------------------insertionSort--------------------------------------------------------
    
    function insertionSort(arr, asc = true) {
        let a = [...arr];
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < a.length; i++) {
            let key = a[i];
            let j = i - 1;

            while (j >= 0) {
                comparisons++;
                if (!compare(a[j], key, asc)) break;

                a[j + 1] = a[j];
                swaps++;
                j--;
            }

            a[j + 1] = key;
        }

        console.log( "Comparisons = " + comparisons + " Swaps = "+ swaps );
        return a;
    }


    //-------------------------shellSort---------------------------------------------------------
    
    function shellSort(arr, asc = true) {
        let a = [...arr];
        let comparisons = 0, swaps = 0;

        let gap = Math.floor(a.length / 2);

        while (gap > 0) {
            for (let i = gap; i < a.length; i++) {
                let temp = a[i];
                let j = i;

                while (j >= gap) {
                    comparisons++;
                    if (!compare(a[j - gap], temp, asc)) break;

                    a[j] = a[j - gap];
                    swaps++;
                    j -= gap;
                }

                a[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        console.log( "Comparisons = " + comparisons + " Swaps = "+ swaps );
        return a;
    }

    
    //--------------------------quickSort--------------------------------------------------------
    
    function quickSort(arr, asc = true) {
        let a = [...arr];
        let comparisons = 0, swaps = 0;

        function qs(left, right) {
            if (left >= right) return;

            let pivot = a[Math.floor((left + right) / 2)];
            let i = left, j = right;

            while (i <= j) {
                while (true) {
                    comparisons++;
                    if (!compare(pivot, a[i], asc)) break;
                    i++;
                }

                while (true) {
                    comparisons++;
                    if (!compare(a[j], pivot, asc)) break;
                    j--;
                }

                if (i <= j) {
                    [a[i], a[j]] = [a[j], a[i]];
                    swaps++;
                    i++;
                    j--;
                }
            }

            qs(left, j);
            qs(i, right);
        }

        qs(0, a.length - 1);

        console.log( "Comparisons = " + comparisons + " Swaps = "+ swaps );
        return a;
    }

    window.sortLib = {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };

})(window);