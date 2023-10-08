import { Web3Storage } from 'web3.storage';

// Construct with token and endpoint
const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdFNkVlY2I5N0U1OEVjQkQ1MjgxNTEzNDY4OENhNzljQTUyMmY0RWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTY2NTY3NTE4NzQsIm5hbWUiOiJlaHItYmxvY2tjaGFpbiJ9.bcd4mXPm6GzXcbffFhL0xl-iyahlm4151tOikIT5C7U" });
const fileInput = document.getElementById("myfile");
const submit = document.getElementById("submit");

// Pack files into a CAR and send to web3.storage

submit.addEventListener("click", myFunc);
async function myFunc(e) {
    e.preventDefault();
    console.log(fileInput);
    console.log(fileInput.files);
    const rootCid = await client.put(fileInput.files, {
        name: 'cat pics',
        maxRetries: 3,
    });
    console.log(rootCid);
}