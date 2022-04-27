"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var ArrowBack_1 = require("../../assets/svg/ArrowBack");
var next_themes_1 = require("next-themes");
var clsx_1 = require("clsx");
var router_1 = require("next/router");
var CarretDown_1 = require("../../assets/svg/CarretDown");
var Send_1 = require("./Send");
var react_hook_form_1 = require("react-hook-form");
var useStoreHooks_1 = require("../../hooks/useStoreHooks");
var ui_1 = require("../../reducers/ui");
var Close_1 = require("../../assets/svg/Close");
var modals_1 = require("../../modals");
var sendCrypto_1 = require("../../services/sendCrypto");
var react_hot_toast_1 = require("react-hot-toast");
var SuccessBadge_1 = require("../../assets/svg/SuccessBadge");
var SmallETH_1 = require("../../assets/svg/SmallETH");
var react_loader_spinner_1 = require("react-loader-spinner");
var BUYING_PENDING = "BUYING_PENDING";
var BUYING_IN_PROGRESS = "BUYING_IN_PROGRESS";
var BUYING_RESOLVED = "BUYING_RESOLVED";
var BUYING_REJECTED = "BUYING_REJECTED";
// Types of modal on this component are:
var SELECT_NETWORK_MODAL = "SELECT_NETWORK_MODAL";
var CRYPTO_STATUS_MODAL = "CRYPTO_STATUS_MODAL";
function Buy() {
    var theme = next_themes_1.useTheme().theme;
    var _a = router_1.useRouter(), back = _a.back, push = _a.push;
    var _b = react_1.useState({}), selectNetwork = _b[0], setSeleectedNetwork = _b[1];
    var _c = react_1.useState(BUYING_PENDING), buyCrptoStatus = _c[0], setBuyCrptoStatus = _c[1];
    var modalType = useStoreHooks_1.useAppSelector(function (state) { return state.ui.modalType; });
    var _d = sendCrypto_1.useBuyOrSellCryptoMutation(), buyCrypto = _d[0], isLoading = _d[1].isLoading;
    var _e = react_hook_form_1.useForm(), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.formState.errors, watch = _e.watch;
    var dispatch = useStoreHooks_1.useAppDispatch();
    var handleClose = function () {
        dispatch(ui_1.hideModal());
    };
    var handleOpen = function (modalType) {
        dispatch(ui_1.showModal({ showModal: true, modalType: modalType }));
    };
    var onSubmit = function (data) {
        for (var value in data) {
            if (!data[value].length) {
                react_hot_toast_1["default"].error("You cant submit an empty form");
            }
        }
        handleOpen(CRYPTO_STATUS_MODAL);
        setBuyCrptoStatus(BUYING_IN_PROGRESS);
        buyCrypto(__assign(__assign({}, data), { type: "buy" }))
            .unwrap()
            .then(function (res) {
            react_hot_toast_1["default"].success("Trade successful");
            setBuyCrptoStatus(BUYING_RESOLVED);
            handleOpen(CRYPTO_STATUS_MODAL);
            console.log(res);
        })["catch"](function (err) {
            react_hot_toast_1["default"].error("Trade gone wrong, try again");
            handleOpen(CRYPTO_STATUS_MODAL);
            setBuyCrptoStatus(BUYING_REJECTED);
            console.log(err, "there was an error while trying to buy crypto");
        });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: " px-8 w-full h-full" },
            react_1["default"].createElement("div", { className: clsx_1["default"]("bg-white py-8 px-7 rounded-xl flex items-center space-x-4", theme === "light" ? "bg-offwhite" : "bg-neutral-800") },
                react_1["default"].createElement("div", { onClick: function () { return back(); }, className: "cursor-pointer" },
                    react_1["default"].createElement(ArrowBack_1["default"], null)),
                react_1["default"].createElement("div", { className: "text-3xl font-bold capitalize" }, "Buy BTC")),
            react_1["default"].createElement("div", { className: "overflow-hidden h-[450px] mt-10 " },
                react_1["default"].createElement("div", { className: clsx_1["default"]("flex flex-1 overflow-y-auto flex-col px-8 h-full rounded-xl text-xl ", theme === "light" ? "bg-white" : "bg-neutral-800") },
                    react_1["default"].createElement("div", { className: "text-[19px] my-8" }, "Select wallet to pay with"),
                    react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between flex-wrap items-stretch " },
                        react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit), className: "md:w-[60%] " },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", { className: "text-neutral-400 font-light text-md" }, "Wallet"),
                                react_1["default"].createElement("div", { onClick: function () { return handleOpen(SELECT_NETWORK_MODAL); }, className: "my-4 w-10/12 text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12 " },
                                    react_1["default"].createElement("div", null, Object.keys(selectNetwork).length ? (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                        react_1["default"].createElement("div", null, selectNetwork === null || selectNetwork === void 0 ? void 0 : selectNetwork.logo), selectNetwork === null || selectNetwork === void 0 ? void 0 :
                                        selectNetwork.shortHand)) : (react_1["default"].createElement("p", null, "Select Wallet"))),
                                    react_1["default"].createElement("div", { className: "aboslute top-2 right-2 " },
                                        react_1["default"].createElement(CarretDown_1["default"], null)))),
                            react_1["default"].createElement("div", { className: "flex justify-between items-center gap-x-5 my-5 w-10/12" },
                                react_1["default"].createElement("div", { className: "w-6/12" },
                                    react_1["default"].createElement("label", { htmlFor: "amount", className: "font-light text-neutral-400  text-[1rem]" }, "Amount to pay"),
                                    react_1["default"].createElement("div", { className: "mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12" },
                                        react_1["default"].createElement("input", __assign({ type: "text", className: "w-10/12 h-full bg-transparent outline-none border-0", placeholder: "1000" }, register("amount", { required: true }), { name: "amount", id: "amount" })),
                                        react_1["default"].createElement("p", null, "NGN")),
                                    react_1["default"].createElement("p", { className: "text-xs text-neutral-500 my-1" },
                                        "Available Balance: ",
                                        react_1["default"].createElement("b", null, "456,780 NGN"))),
                                react_1["default"].createElement("div", { className: "w-6/12" },
                                    react_1["default"].createElement("label", { htmlFor: "eth_amount", className: "font-light text-neutral-400 text-[1rem]" }, "Recieve"),
                                    react_1["default"].createElement("div", { className: "mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12" },
                                        react_1["default"].createElement("input", __assign({ type: "text", className: "w-10/12 h-full bg-transparent outline-none border-0", placeholder: "1000" }, register("eth_amount", { required: true }), { name: "eth_amount", id: "eth_amount" })),
                                        react_1["default"].createElement("p", null, "NGN")),
                                    react_1["default"].createElement("p", { className: "text-xs text-neutral-500 my-1" },
                                        "0.90 USD at",
                                        react_1["default"].createElement("b", null, " N580/USD")))),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("button", { type: "submit", className: clsx_1["default"]("text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer", isLoading ? "bg-secondary" : "bg-primary") }, "Buy"))),
                        react_1["default"].createElement("div", { className: "md:w-[40%]" },
                            react_1["default"].createElement("div", { className: clsx_1["default"](" shadow rounded-lg w-10/12 ml-auto p-5", theme === "light" ? "bg-gray-200" : "bg-neutral-700") },
                                react_1["default"].createElement("div", { className: "flex items-start flex-col" },
                                    react_1["default"].createElement("p", { className: "font-bold text-sm" }, "You are Paying"),
                                    react_1["default"].createElement("p", { className: "flex justify-start gap-x-2 items-center" },
                                        react_1["default"].createElement("span", { className: "text-gray-500 font-bold text-2xl" }, "1000"),
                                        react_1["default"].createElement("span", { className: "text-xl" }, "NGN"))),
                                react_1["default"].createElement("div", { className: "mt-6 mb-3" },
                                    react_1["default"].createElement("p", { className: "font-bold text-sm text-gray-500" }, "You will receive"),
                                    react_1["default"].createElement("div", { className: "text-2xl font-bold my-3" },
                                        react_1["default"].createElement("p", null,
                                            "1 ",
                                            react_1["default"].createElement("span", null, "BTC")))),
                                react_1["default"].createElement("div", { className: "flex space-x-3 items-center" },
                                    react_1["default"].createElement("p", { className: "text-gray-400 text-base" }, "0.90 USD at N580/USD")))))))),
        react_1["default"].createElement(modals_1["default"], null,
            modalType === SELECT_NETWORK_MODAL && (react_1["default"].createElement("div", { className: "w-full" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("p", { className: "text-xl font-bold" }, "Select Network")),
                react_1["default"].createElement("div", { onClick: function () { return handleClose(); }, className: clsx_1["default"]("absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100", theme === "light" ? "bg-neutral-100" : "bg-neutral-600") },
                    react_1["default"].createElement(Close_1["default"], null)),
                react_1["default"].createElement("p", { className: "text-sm my-2 font-smeibold" }, "Ensure the network you choose to deposit matches the withdrawal network, or assets may be lost."),
                react_1["default"].createElement("div", null, Send_1.availableNetwork === null || Send_1.availableNetwork === void 0 ? void 0 : Send_1.availableNetwork.map(function (network, index) { return (react_1["default"].createElement("div", { key: index, onClick: function () {
                        setSeleectedNetwork(network);
                        handleClose();
                    }, className: clsx_1["default"]("flex items-center justify-between group rounded-sm p-3 gap-3 w-12/12 cursor-pointer", theme === "light" ? "hover:bg-neutral-100" : "hover:bg-neutral-600") },
                    react_1["default"].createElement("div", { className: "flex gap-3" },
                        react_1["default"].createElement("div", null, network.logo),
                        react_1["default"].createElement("div", { className: "" },
                            react_1["default"].createElement("p", { className: "text-gray-500" }, network.shortHand),
                            react_1["default"].createElement("p", { className: "text-gray-500" }, network.fullName))),
                    react_1["default"].createElement("p", { className: "text-sm" }, network.fee))); })))),
            modalType === CRYPTO_STATUS_MODAL && (react_1["default"].createElement("div", null,
                buyCrptoStatus === BUYING_IN_PROGRESS && (react_1["default"].createElement("div", { className: "flex flex-col my-3 text-center justify-center items-center" },
                    react_1["default"].createElement("p", null, "Trying to Process your transaction"),
                    react_1["default"].createElement("div", { className: "my-2" },
                        react_1["default"].createElement(react_loader_spinner_1["default"], { type: "Audio", color: "#683a9e", height: 40, width: 60 })))),
                buyCrptoStatus === BUYING_RESOLVED && (react_1["default"].createElement("div", null,
                    react_1["default"].createElement("p", { className: "flex justify-center items-center" },
                        react_1["default"].createElement(SuccessBadge_1["default"], null)),
                    react_1["default"].createElement("p", { className: "text-2xl mb-2 text-center font-smeibold" }, "Transfer successful!"),
                    react_1["default"].createElement("p", { className: "text-sm justify-center text-center my-2 items-center flex gap-1 font-smeibold" },
                        react_1["default"].createElement(SmallETH_1["default"], null),
                        react_1["default"].createElement("span", null, "10000 Eth have been transfered successfully!")))),
                buyCrptoStatus === BUYING_REJECTED && (react_1["default"].createElement("div", { className: "my-3 text-center" }, "Something went wrong please try again")),
                react_1["default"].createElement("div", { className: "mx-auto my-3 flex justify-center items-center" },
                    react_1["default"].createElement("button", { onClick: function () {
                            handleClose();
                            push("/wallets");
                        }, type: "submit", className: "bg-primary mx-center text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer" }, "Back To Wallet"))))),
        react_1["default"].createElement(react_hot_toast_1.Toaster, null)));
}
exports["default"] = Buy;
