
*** Settings ***
Documentation     Test cases for the Swag Labs shopping cart
Resource          ../resources/common_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***
TC-09 Add Product To Shopping Cart
    Login To Swag Labs

    Add Product To Cart

    ${cart_count}=    Get Text    [data-test="shopping-cart-badge"]
    Should Be Equal As Strings    ${cart_count}    1

    Open Shopping Cart

    ${product_name}=    Get Text    [data-test="inventory-item-name"]
    Should Be Equal As Strings    ${product_name}    ${PRODUCT}

TC-10 Remove Product From Shopping Cart
    Login To Swag Labs

    Add Product To Cart
    Open Shopping Cart

    Click    [data-test="remove-sauce-labs-backpack"]

    Get Element Count    [data-test="inventory-item"]    ==    0
    Get Element Count    [data-test="shopping-cart-badge"]    ==    0