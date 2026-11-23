*** Settings ***
Documentation     Test cases for the Swag Labs homepage.
...
...               Keywords are imported from the resource file
Resource          ../resources/common_keywords.robot
Test Teardown     Close Browser

*** Test Cases ***

TS-03 Open The Menu
    Login To Swag Labs

    Get Attribute    .bm-menu-wrap    aria-hidden    ==    true

    Click    [id="react-burger-menu-btn"]

    Get Attribute    .bm-menu-wrap    aria-hidden    ==    false

    Wait For Elements State    [id="inventory_sidebar_link"]    visible    timeout=10s
    Wait For Elements State    [id="dynamic_catalog_sidebar_link"]    visible
    Wait For Elements State    [id="about_sidebar_link"]    visible
    Wait For Elements State    [id="logout_sidebar_link"]    visible
    Wait For Elements State    [id="reset_sidebar_link"]    visible

    Get Element Count    [data-test="error"]    ==    0

TS-04 Close The Menu

    Login To Swag Labs

    Get Attribute    .bm-menu-wrap    aria-hidden    ==    true

    Click    [id="react-burger-menu-btn"]
    Get Attribute    .bm-menu-wrap    aria-hidden    ==    false
    Click    [id="react-burger-cross-btn"]

    Get Attribute    .bm-menu-wrap    aria-hidden    ==    true
    Get Element Count    [data-test="error"]    ==    0

*** Keywords ***