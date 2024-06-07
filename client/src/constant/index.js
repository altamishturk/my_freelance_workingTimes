let DOMAIN_NAME = undefined;

if(window.location.hostname === "localhost"){
    DOMAIN_NAME = "http://localhost:4000";
}
else {
    DOMAIN_NAME = "https://impossible-puce-loafers.cyclic.app";
}

export {DOMAIN_NAME};
