let arr = [];
let arr2 = [];

for (let i = 0; i < 100; i++) {
    if (Math.random() < 0.2) {
        arr.push(undefined); 
    } else {
        arr.push(Math.floor(Math.random() * 100)); 
    }
    arr2.push(Math.floor(Math.random() * 100));
}


    console.log("Сортування розрідженого масиву: ");
    console.log("Масив: " + arr);
    console.log("Bubble sort: " + sortLib.bubbleSort(arr, true));  
    console.log("Selection sort: " + sortLib.selectionSort(arr, true)); 
    console.log("Insertion sort: " + sortLib.insertionSort(arr, true)); 
    console.log("Shell sort: " + sortLib.shellSort(arr, true)); 
    console.log("Quick sort: " + sortLib.quickSort(arr, true)); 

    console.log("\nСортування нерозрідженого масиву: ");
    console.log("Масив: " + arr2);
    console.log("Bubble sort: " + sortLib.bubbleSort(arr2, true));  
    console.log("Selection sort: " + sortLib.selectionSort(arr2, true)); 
    console.log("Insertion sort: "+ sortLib.insertionSort(arr2, true));  
    console.log("Shell sort: " + sortLib.shellSort(arr2, true));  
    console.log("Quick sort: " + sortLib.quickSort(arr2, true)); 
