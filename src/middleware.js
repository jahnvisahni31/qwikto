import { NextResponse } from "next/server";
import BASE_URL from "./appConfig";

export async function middleware(request) {
    let token = 'worngtokent';
    let type = '';
    // let serverStatus = '';
    // let dbStatus = '';
    
    const tokenkey = request.cookies.get('token');

    if (tokenkey !== undefined) {
        token = tokenkey.value;
    }

    const fetchCurrentData = async () => {
        try {
            // const token = JSON.parse(localStorage.getItem("data"));
            const response = await fetch(`${BASE_URL}/api/loginSignup/currentUser`, {
                method: "Get",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const newData = await response.json();
            if (newData.user) {
                request.currentUser = "logdin"
                type = newData.user.type;
            } else {
                request.currentUser = "userNotLogdin"
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const checkServer = async () => {
    //     try {
    //         // const token = JSON.parse(localStorage.getItem("data"));
    //         const response = await fetch(`${BASE_URL}/api/loginSignup/checkServer`, {
    //             method: "Get",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         });
    //         const newData = await response.json();
    //         if (response.ok) {
    //             console.log(newData);
    //             serverStatus = newData.serverStatus;
    //             dbStatus = newData.dbStatus;
    //         } else {
    //             console.error('Error fetching data:', newData.message);
    //         }

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // await checkServer()
    await fetchCurrentData();

    if (request.nextUrl.pathname.startsWith('/Pages/Customer') && request.currentUser === "userNotLogdin") {
        return NextResponse.redirect(new URL("/Pages/SignUp_Login", request.url))
    }

    if(request.nextUrl.pathname.startsWith("/Pages/Vendor") && request.currentUser === 'userNotLogdin'){
        return NextResponse.redirect(new URL("/Pages/SignUp_Login",request.url))
    }

    if(request.nextUrl.pathname.startsWith("/Pages/Customer") && request.currentUser === 'logdin' && type === 'vendor'){
        return NextResponse.redirect(new URL("/Pages/Vendor",request.url))
    }

    if(request.nextUrl.pathname.startsWith("/Pages/Items") && (request.currentUser === 'logdin' || request.currentUser === 'userNotLogdin') && type === 'vendor'){
        return NextResponse.redirect(new URL("/",request.url))
    }

    if(request.nextUrl.pathname.startsWith("/Pages/Vendor") && request.currentUser === 'logdin' && type === 'customer'){
        return NextResponse.redirect(new URL("/Pages/Customer",request.url))
    }

    if(request.nextUrl.pathname.startsWith("/Pages/SignUp_Login") && request.currentUser === 'logdin'){
        return NextResponse.redirect(new URL("/",request.url))
    }

    // if(request.nextUrl.pathname.startsWith("/Pages/cart") && request.currentUser === 'userNotLogdin'){
    //     return NextResponse.redirect(new URL("/Pages/signup_login",request.url))
    // }

    // if(request.nextUrl.pathname.startsWith("/Pages/do_order") && request.currentUser === 'userNotLogdin'){
    //     return NextResponse.redirect(new URL("/",request.url))
    // }

}

export const config = {
    // matcher: ['/Pages/do_order/:path*','/Pages/cart/:path*','/Pages/signup_login/:path*','/Pages/orders/:path*', '/Pages/user_account/:path*']
    matcher: ['/Pages/SignUp_Login/:path*', '/Pages/User/:path*', '/Pages/Customer/:path*', '/Pages/Vendor/:path*', '/Pages/Items/:path*']
}