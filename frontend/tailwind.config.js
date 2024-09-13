/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js",
    ],

    theme: {
        extend: {
            colors: {
                green1: "#D9EDAC", //secondary
                green2: "#C9FE59", //use
                green3: "#C9FE54", //green
                green4: "#96B84B",//iconUser
                green5: "#8BC804",//hover
                green6: "#4caf50",//success
                red:"#f44336",//error
                gray1: "#C4C4C4",//dropZone
                gray2: "#B3B3B3",//third
                gray3: "#383838",//createBTN
                gray4: "#242424",//sidebar
                gray5: "#1E1E1E",//loginInput
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            spacing: {
                112: "28rem",
                120: "30rem",
                5: "1.25rem",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                },
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio'),],
};
