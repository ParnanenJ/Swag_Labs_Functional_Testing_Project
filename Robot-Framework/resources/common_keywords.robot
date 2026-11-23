*** Settings ***
Documentation     This is a resource file, that contains common keywords.
Library           Browser
Resource          variables.robot


*** Keywords ***
Login To Swag Labs
    New Browser    chromium    headless=False
    New Context
    New Page    ${URL}

    Fill Text    [data-test="username"]    ${USERNAME}
    Fill Text    [data-test="password"]    ${PASSWORD}
    Click    [data-test="login-button"]

Add Product To Cart
    Click    [data-test="add-to-cart-sauce-labs-backpack"]
Open Shopping Cart
    Click    [data-test="shopping-cart-link"]