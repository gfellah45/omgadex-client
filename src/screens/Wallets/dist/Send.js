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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.availableNetwork = void 0;
var react_1 = require("react");
var next_themes_1 = require("next-themes");
var clsx_1 = require("clsx");
var ArrowBack_1 = require("../../assets/svg/ArrowBack");
var router_1 = require("next/router");
var CarretDown_1 = require("../../assets/svg/CarretDown");
var SelectCoin_1 = require("./SelectCoin");
var SmallNaira_1 = require("../../assets/svg/SmallNaira");
var SmallBTC_1 = require("../../assets/svg/SmallBTC");
var SmallETH_1 = require("../../assets/svg/SmallETH");
var SmallTether_1 = require("../../assets/svg/SmallTether");
var SmallXRP_1 = require("../../assets/svg/SmallXRP");
var SmallBNB_1 = require("../../assets/svg/SmallBNB");
var Tether_1 = require("../../assets/svg/Tether");
var modals_1 = require("../../modals");
var ui_1 = require("../../reducers/ui");
var useStoreHooks_1 = require("../../hooks/useStoreHooks");
var Eth_1 = require("../../assets/svg/Eth");
var Btc_1 = require("../../assets/svg/Btc");
var Binance_1 = require("../../assets/svg/Binance");
var Ripple_1 = require("../../assets/svg/Ripple");
var FiatNaira_1 = require("../../assets/svg/FiatNaira");
var Close_1 = require("../../assets/svg/Close");
var sendCrypto_1 = require("../../services/sendCrypto");
var react_hot_toast_1 = require("react-hot-toast");
var react_hook_form_1 = require("react-hook-form");
var SuccessBadge_1 = require("../../assets/svg/SuccessBadge");
var CopyIcon_1 = require("../../assets/svg/CopyIcon");
var react_qr_code_1 = require("react-qr-code");
var react_loader_spinner_1 = require("react-loader-spinner");
exports.availableNetwork = [
    {
        shortHand: "eth",
        fullName: "Ethereum",
        logo: react_1["default"].createElement(Eth_1["default"], { width: "40", height: "40" }),
        fee: "Fee 0.80 eth"
    },
    {
        shortHand: "lxrp",
        fullName: "Ripple",
        logo: react_1["default"].createElement(Ripple_1["default"], { width: "40", height: "40" }),
        fee: "Fee 0.80 lxrp"
    },
    {
        shortHand: "lusdt",
        fullName: "USDT",
        logo: react_1["default"].createElement(Tether_1["default"], { width: "40", height: "40" }),
        fee: "Fee 0.80 eth"
    },
];
var SELECT_COIN_MODAL = "SELECT_COIN";
var SELECT_NETWORK_MODAL = "SELECT_NETWORK_MODAL";
var TRANSFER_SUCCESSFUL_MODAL = "TRANSFER_SUCCESSFUL_MODAL";
// RECIEVE NETWORK
var UNINITIALIZED = "UNINITIALIZED";
var INITIALIZED = "INITIALIZED";
var RESOLVED = "RESOLVED";
var REJECTED = "REJECTED";
var TRXN_SIGN_INITIALIZED = "TRXN_SIGN_INITIALIZED";
var TRXN_SIGN_APPROVED = "TRXN_SIGNED";
var TRXN_SIGN_REJECTED = "TRXN_FAILED";
var TRXN_SEND_RESOLVED = "TRXN_SEND_RESOLVED";
var TRXN_SEND_REJECTED = "TRXN_SEND_REJECTED";
var Send = function () {
    var _a = react_1.useState({}), selectedCoin = _a[0], setSelectedCoin = _a[1];
    var _b = react_1.useState({}), selectNetwork = _b[0], setSeleectedNetwork = _b[1];
    var _c = react_1.useState(""), amount = _c[0], setAmount = _c[1];
    var _d = react_1.useState(UNINITIALIZED), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(""), availableBalance = _e[0], setAvailableBalance = _e[1];
    var _f = react_1.useState(""), receiverAddress = _f[0], setReceiverAddress = _f[1];
    var _g = react_1.useState(TRXN_SIGN_INITIALIZED), signedTrxnState = _g[0], setSignedTrxnState = _g[1];
    var theme = next_themes_1.useTheme().theme;
    var _h = react_hook_form_1.useForm(), register = _h.register, handleSubmit = _h.handleSubmit, errors = _h.formState.errors, watch = _h.watch;
    var _j = router_1.useRouter(), back = _j.back, push = _j.push;
    var dispatch = useStoreHooks_1.useAppDispatch();
    var handleOpen = function (modalType) {
        dispatch(ui_1.showModal({ showModal: true, modalType: modalType }));
    };
    var handleClose = function () {
        dispatch(ui_1.hideModal());
    };
    var copyAddress = function (address) {
        navigator.clipboard.writeText(address);
        react_hot_toast_1["default"].success("Address successfully Copied");
    };
    var _k = sendCrypto_1.useSignTransactionMutation(), sign = _k[0], status1 = _k[1];
    var _l = sendCrypto_1.useSendTransactionMutation(), send = _l[0], status = _l[1];
    var _m = sendCrypto_1.useRecieveTransactionMutation(), recieve = _m[0], recieveStatus = _m[1];
    var goReceiveMyCoins = function () { return __awaiter(void 0, void 0, void 0, function () {
        var extraParams;
        return __generator(this, function (_a) {
            setLoading(INITIALIZED);
            extraParams = {
                token: selectedCoin === null || selectedCoin === void 0 ? void 0 : selectedCoin.shortHand.toLowerCase(),
                network: "erc-20"
            };
            recieve(extraParams)
                .unwrap()
                .then(function (_a) {
                var message = _a.message, payload = _a.payload;
                setAvailableBalance(payload.balance);
                setReceiverAddress(payload.address);
                setLoading(RESOLVED);
                react_hot_toast_1["default"].success("Payment Recieved successfully");
            })["catch"](function (err) {
                setLoading(REJECTED);
                react_hot_toast_1["default"].error("Something went wrong, please try again shortly");
                console.table(err);
            });
            return [2 /*return*/];
        });
    }); };
    var onSubmit = function (data) {
        var extraParams = __assign(__assign({}, data), { token: selectNetwork.shortHand });
        setAmount(data.amount);
        sign(extraParams)
            .unwrap()
            .then(function (res) {
            react_hot_toast_1["default"].success("Transaction successfully signed");
            // Transfer signed succesfully modal will be triggered here and the content state wil be updated here too
            handleOpen(TRANSFER_SUCCESSFUL_MODAL);
            setSignedTrxnState(TRXN_SIGN_APPROVED);
            send({
                token: res.payload.token
            })
                .unwrap()
                .then(function (res) {
                react_hot_toast_1["default"].success("transaction sent successfully");
                // A varialble constant will be made to update here so we could change the content of the modal after a succesfull transaction
                setSignedTrxnState(TRXN_SEND_RESOLVED);
            })["catch"](function (err) {
                console.log(err, "error while sending transaction");
                setSignedTrxnState(TRXN_SEND_REJECTED);
                react_hot_toast_1["default"].error("Transaction couldnt be processed at the moment");
            });
        })["catch"](function (err) {
            console.log(err, "error while signing transaction");
            setSignedTrxnState(TRXN_SIGN_REJECTED);
            react_hot_toast_1["default"].error("Unable to transfer tokenError");
        });
    };
    var _o = useStoreHooks_1.useAppSelector(function (state) { return state.ui; }), trade = _o.trade, tradeProps = _o.tradeProps, modalType = _o.modalType;
    var changeSelectedCoin = function (newCoin) {
        setSelectedCoin(newCoin);
    };
    var currencyIcons = {
        ETH: react_1["default"].createElement(Eth_1["default"], null),
        BTC: react_1["default"].createElement(Btc_1["default"], null),
        BNB: react_1["default"].createElement(Binance_1["default"], null),
        XRP: react_1["default"].createElement(Ripple_1["default"], null),
        USDT: react_1["default"].createElement(Tether_1["default"], null),
        NGN: react_1["default"].createElement(FiatNaira_1["default"], null)
    };
    var code = tradeProps.currencyCode;
    return (react_1["default"].createElement("div", { className: " px-8 w-full h-full" },
        react_1["default"].createElement("div", { className: clsx_1["default"]("bg-white py-8 px-7 rounded-xl flex items-center space-x-4", theme === "light" ? "bg-offwhite" : "bg-neutral-800") },
            react_1["default"].createElement("div", { onClick: function () { return back(); }, className: "cursor-pointer" },
                react_1["default"].createElement(ArrowBack_1["default"], null)),
            react_1["default"].createElement("div", { className: "text-3xl font-bold capitalize" }, trade)),
        trade === "Send" && (react_1["default"].createElement("div", { className: "overflow-hidden h-[450px] mt-10 " },
            react_1["default"].createElement("div", { className: clsx_1["default"]("flex flex-1 overflow-y-auto flex-col px-8 h-full rounded-xl text-xl ", theme === "light" ? "bg-white" : "bg-neutral-800") },
                react_1["default"].createElement("div", { className: "text-[27px] font-semibold my-10 " }, "Select Wallet"),
                react_1["default"].createElement("div", { className: " mt-8 grid grid-cols-2" },
                    react_1["default"].createElement("div", { className: "w-full" },
                        react_1["default"].createElement("p", { className: "text-gray-400 text-xs" }, "Coins"),
                        react_1["default"].createElement("div", { onClick: function () { return handleOpen(SELECT_COIN_MODAL); }, className: "my-4 w-9/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 " },
                            react_1["default"].createElement("div", null, Object.keys(selectedCoin).length ? (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                react_1["default"].createElement("div", null, selectedCoin === null || selectedCoin === void 0 ? void 0 : selectedCoin.logo), selectedCoin === null || selectedCoin === void 0 ? void 0 :
                                selectedCoin.shortHand)) : (react_1["default"].createElement("p", null, "Select coin"))),
                            react_1["default"].createElement("div", { className: "aboslute top-2 right-2 " },
                                react_1["default"].createElement(CarretDown_1["default"], null))),
                        react_1["default"].createElement("div", { className: "grid grid-cols-6 gap-2 w-9/12" },
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallNaira_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "NGN")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallBTC_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "BTC")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallETH_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "ETH")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallTether_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "USDT")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallXRP_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "XRP")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallBNB_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "BNB"))),
                        Object.keys(selectedCoin).length ? (react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                            react_1["default"].createElement("div", { className: clsx_1["default"]("my-10 w-9/12") },
                                react_1["default"].createElement("label", { className: "text-gray-400 text-xs", htmlFor: "receiver_address" }, "Send to Address"),
                                react_1["default"].createElement("div", { className: clsx_1["default"]("my-3 border ") },
                                    react_1["default"].createElement("input", __assign({ type: "text" }, register("receiver_address"), { required: true, className: clsx_1["default"]("w-full py-3  px-1 focus:outline-none placeholder:text-sm", theme === "light" ? "bg-neutral-100" : "bg-neutral-800"), placeholder: "Enter address" })))),
                            react_1["default"].createElement("div", { className: "my-10 w-9/12" },
                                react_1["default"].createElement("label", { className: "text-gray-400 text-xs", htmlFor: "selectNetwork" }, "Select Network"),
                                react_1["default"].createElement("div", { onClick: function () { return handleOpen(SELECT_NETWORK_MODAL); }, id: "selectNetwork", className: "my-4 w-12/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 " },
                                    react_1["default"].createElement("div", null, Object.keys(selectNetwork).length ? (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                        react_1["default"].createElement("div", null, selectNetwork["shortHand"]),
                                        selectNetwork["fullName"])) : (react_1["default"].createElement("p", null, "Select Network"))),
                                    react_1["default"].createElement("div", { className: "aboslute top-2 right-2 " },
                                        react_1["default"].createElement(CarretDown_1["default"], null)))),
                            react_1["default"].createElement("div", { className: "my-10 w-9/12" },
                                react_1["default"].createElement("label", { className: "text-gray-400 text-xs", htmlFor: "amount" }, "Amount"),
                                react_1["default"].createElement("div", { className: "my-3 border" },
                                    react_1["default"].createElement("input", __assign({ type: "text" }, register("amount"), { maxLength: 100, className: clsx_1["default"]("w-full py-3  px-1 focus:outline-none placeholder:text-sm", theme === "light" ? "bg-neutral-100" : "bg-neutral-800"), placeholder: "Amount", required: true }))),
                                react_1["default"].createElement("p", { className: "text-[10px] text-gray-500" }, "$1,000,000.00 daily withdrawal limit remaining.")),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("button", { type: "submit", className: clsx_1["default"]("text-center w-9/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer", status1.isLoading ? "bg-secondary" : "bg-primary") }, status1.isLoading ? "Sending..." : "Send")))) : null),
                    react_1["default"].createElement("div", { className: "text-left px-12" },
                        react_1["default"].createElement("div", { className: clsx_1["default"](" shadow rounded-lg w-10/12 ml-auto p-5", theme === "light" ? "bg-gray-200" : "bg-neutral-700") },
                            react_1["default"].createElement("div", { className: "flex items-center space-x-3" },
                                currencyIcons[code] ? currencyIcons[code] : react_1["default"].createElement("div", null),
                                react_1["default"].createElement("p", { className: "font-bold text-4xl" }, tradeProps.currencyCode),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-2xl" },
                                    tradeProps.currencyCode,
                                    " Wallet")),
                            react_1["default"].createElement("div", { className: "my-6" },
                                react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Available balance"),
                                react_1["default"].createElement("div", { className: "text-5xl font-bold my-3" }, Number(tradeProps.balance).toPrecision(7).toLocaleString() || "0.00")),
                            react_1["default"].createElement("div", { className: "my-6 flex space-x-3 items-center" },
                                react_1["default"].createElement("p", { className: "text-gray-400 text-base" }, Number(tradeProps.cryptoBalance).toPrecision(7) || "0.00"),
                                react_1["default"].createElement("p", { className: "bg-gray-400 text-sm shadow text-white rounded p-1" }, tradeProps.currencyCode)))))))),
        trade === "Recieve" && (react_1["default"].createElement("div", { className: "overflow-hidden h-[450px] mt-10 " },
            react_1["default"].createElement("div", { className: clsx_1["default"]("flex flex-1 flex-col  overflow-y-auto px-8 h-full rounded-xl text-xl", theme === "light" ? "bg-white" : "bg-neutral-800") },
                react_1["default"].createElement("div", { className: "text-[27px] font-semibold my-10 " }, "Select Wallet"),
                react_1["default"].createElement("div", { className: " mt-8 grid grid-cols-2" },
                    react_1["default"].createElement("div", { className: "w-full" },
                        react_1["default"].createElement("p", { className: "text-gray-400 text-xs" }, "Coins"),
                        react_1["default"].createElement("div", { onClick: function () { return handleOpen(SELECT_COIN_MODAL); }, className: "my-4 w-9/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 " },
                            react_1["default"].createElement("div", null, Object.keys(selectedCoin).length ? (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                react_1["default"].createElement("div", null, selectedCoin === null || selectedCoin === void 0 ? void 0 : selectedCoin.logo), selectedCoin === null || selectedCoin === void 0 ? void 0 :
                                selectedCoin.shortHand)) : (react_1["default"].createElement("p", null, "Select coin"))),
                            react_1["default"].createElement("div", { className: "aboslute top-2 right-2 " },
                                react_1["default"].createElement(CarretDown_1["default"], null))),
                        react_1["default"].createElement("div", { className: "grid grid-cols-6 gap-2 w-9/12" },
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallNaira_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "NGN")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallBTC_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "BTC")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallETH_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "ETH")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallTether_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "USDT")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallXRP_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "XRP")),
                            react_1["default"].createElement("div", { className: "flex items-center space-x-2 " },
                                react_1["default"].createElement(SmallBNB_1["default"], null),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-[12px]" }, "BNB"))),
                        react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                            Object.keys(selectedCoin).length ? (react_1["default"].createElement("div", { className: "my-10 w-9/12" },
                                react_1["default"].createElement("label", { className: "text-gray-400 text-xs", htmlFor: "selectNetwork" }, "Select Network"),
                                react_1["default"].createElement("div", { onClick: function () { return handleOpen(SELECT_NETWORK_MODAL); }, id: "selectNetwork", className: "my-4 w-12/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 " },
                                    react_1["default"].createElement("div", null, Object.keys(selectNetwork).length ? (react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                                        react_1["default"].createElement("div", null, selectNetwork["shortHand"]),
                                        selectNetwork["fullName"])) : (react_1["default"].createElement("p", null, "Select Network"))),
                                    react_1["default"].createElement("div", { className: "aboslute top-2 right-2 " },
                                        react_1["default"].createElement(CarretDown_1["default"], null))))) : null,
                            loading === UNINITIALIZED && null,
                            loading === INITIALIZED && react_1["default"].createElement("h1", null, "Processing Transaction...."),
                            loading === RESOLVED && (react_1["default"].createElement("div", { className: "my-10 w-9/12 " },
                                react_1["default"].createElement("p", { className: "text-center " }, "Address"),
                                react_1["default"].createElement("p", { className: "text-center w-9/12 mx-auto text-neutral-500 text-sm" }, "Only send USDT to this address. Sending any other asset to this address may result in the loss of your deposit!"),
                                react_1["default"].createElement("div", { className: clsx_1["default"]("border rounded py-1 my-2 items-center justify-between   pl-2 flex gap-x-2 h-10 w-full", theme === "light" ? "bg-neutral-100" : "bg-neutral-800") },
                                    react_1["default"].createElement("input", { type: "text", value: receiverAddress, readOnly: true, className: "w-full h-full outline-none bg-transparent leading-tight appearance-none" }),
                                    react_1["default"].createElement(CopyIcon_1["default"], { color: theme === "light" ? "#E6E8EC" : "bg-neutral-700", bgColor: theme === "light" ? "#E6E8EC" : "bg-neutral-800", onClick: function () {
                                            copyAddress(receiverAddress);
                                        } })),
                                react_1["default"].createElement("div", { className: "h-[10rem] mx-auto mt-7 p-2 w-[10rem] border-dashed border-2 rounded" },
                                    react_1["default"].createElement(react_qr_code_1["default"], { value: receiverAddress, size: 140 })))),
                            loading === REJECTED && react_1["default"].createElement("h1", null, "Something went wrong please try again"))),
                    react_1["default"].createElement("div", { className: "text-left px-12" },
                        react_1["default"].createElement("div", { className: clsx_1["default"]("shadow rounded-lg w-10/12 ml-auto p-5", theme === "light" ? "bg-gray-200" : "bg-neutral-700") },
                            react_1["default"].createElement("div", { className: "flex items-center space-x-3" },
                                currencyIcons[code] ? currencyIcons[code] : react_1["default"].createElement("div", null),
                                react_1["default"].createElement("p", { className: "font-bold text-4xl" }, tradeProps.currencyCode),
                                react_1["default"].createElement("p", { className: "text-gray-500 text-2xl" },
                                    tradeProps.currencyCode,
                                    " Wallet")),
                            react_1["default"].createElement("div", { className: "my-6" },
                                react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Available balance"),
                                react_1["default"].createElement("div", { className: "text-5xl font-bold my-3" }, Number(availableBalance).toPrecision(7).toLocaleString() || "0.00")),
                            react_1["default"].createElement("div", { className: "my-6 flex space-x-3 items-center" },
                                react_1["default"].createElement("p", { className: "text-gray-400 text-base" }, Number(tradeProps.cryptoBalance).toPrecision(7) || "0.00"),
                                react_1["default"].createElement("p", { className: "bg-gray-400 text-sm shadow text-white rounded p-1" }, tradeProps.currencyCode))),
                        react_1["default"].createElement("ul", { className: "w-9/12 list-disc pr-5 ml-auto mt-8 text-[1rem]" },
                            react_1["default"].createElement("li", null,
                                "Send ",
                                react_1["default"].createElement("span", { className: "text-orange-600" },
                                    "only ",
                                    selectedCoin.shortHand),
                                " to this deposit address"),
                            react_1["default"].createElement("li", null,
                                "Ensure the network is",
                                " ",
                                react_1["default"].createElement("span", { className: "text-orange-600" }, selectedCoin.fullName),
                                "."),
                            react_1["default"].createElement("li", null, "Please be sure that the contract address is related to the tokens that you are Receiving."))))))),
        react_1["default"].createElement(modals_1["default"], null,
            react_1["default"].createElement(react_1["default"].Fragment, null,
                modalType === SELECT_COIN_MODAL && (react_1["default"].createElement(SelectCoin_1["default"], { changeCoin: function (x) {
                        handleClose();
                        changeSelectedCoin(x);
                    }, action: handleClose, title: "Select Coin" })),
                modalType === SELECT_NETWORK_MODAL && (react_1["default"].createElement("div", { className: "w-full" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "text-xl font-bold" }, "Select Network")),
                    react_1["default"].createElement("div", { onClick: function () { return handleClose(); }, className: clsx_1["default"]("absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100", theme === "light" ? "bg-neutral-100" : "bg-neutral-600") },
                        react_1["default"].createElement(Close_1["default"], null)),
                    react_1["default"].createElement("p", { className: "text-sm my-2 font-smeibold" }, "Ensure the network you choose to deposit matches the withdrawal network, or assets may be lost."),
                    react_1["default"].createElement("div", null, exports.availableNetwork.map(function (network, index) { return (react_1["default"].createElement("div", { key: index, onClick: function () {
                            setSeleectedNetwork(network);
                            handleClose();
                            if (trade === "Recieve") {
                                goReceiveMyCoins();
                            }
                        }, className: clsx_1["default"]("flex items-center justify-between group rounded-sm p-3 gap-3 w-12/12 cursor-pointer", theme === "light" ? "hover:bg-neutral-100" : "hover:bg-neutral-600") },
                        react_1["default"].createElement("div", { className: "flex gap-3" },
                            react_1["default"].createElement("div", null, network.logo),
                            react_1["default"].createElement("div", { className: "" },
                                react_1["default"].createElement("p", { className: "text-gray-500" }, network.shortHand),
                                react_1["default"].createElement("p", { className: "text-gray-500" }, network.fullName))),
                        react_1["default"].createElement("p", { className: "text-sm" }, network.fee))); })))),
                modalType === TRANSFER_SUCCESSFUL_MODAL && (react_1["default"].createElement("div", { className: "w-full" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "text-xl text-center justify-center items-center flex gap-2 font-bold" },
                            react_1["default"].createElement("span", { className: "" }, selectNetwork["logo"]),
                            react_1["default"].createElement("span", { className: "" }, selectNetwork["fullName"]))),
                    signedTrxnState === TRXN_SIGN_APPROVED && (react_1["default"].createElement("div", { className: "flex flex-col my-3 text-center justify-center items-center" },
                        react_1["default"].createElement("p", null, "Your transaction has been signed successfully"),
                        react_1["default"].createElement("p", null, "Trying to Process your transaction"),
                        react_1["default"].createElement("div", { className: "my-2" },
                            react_1["default"].createElement(react_loader_spinner_1["default"], { type: "Audio", color: "#683a9e", height: 40, width: 60 })))),
                    signedTrxnState === TRXN_SIGN_REJECTED && (react_1["default"].createElement("p", null, "Opps, something went wrong somewhere")),
                    signedTrxnState === TRXN_SEND_RESOLVED && (react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "flex justify-center items-center" },
                            react_1["default"].createElement(SuccessBadge_1["default"], null)),
                        react_1["default"].createElement("p", { className: "text-2xl mb-2 text-center font-smeibold" }, "Transfer successful!"),
                        react_1["default"].createElement("p", { className: "text-sm justify-center text-center my-2 items-center flex gap-1 font-smeibold" },
                            react_1["default"].createElement(SmallETH_1["default"], null),
                            react_1["default"].createElement("span", null,
                                amount,
                                " Eth have been transfered successfully!")))),
                    signedTrxnState === TRXN_SEND_REJECTED && (react_1["default"].createElement("div", { className: "my-3 text-center" }, "Something went wrong please try again")),
                    react_1["default"].createElement("div", { className: "mx-auto my-3 flex justify-center items-center" },
                        react_1["default"].createElement("button", { onClick: function () {
                                handleClose();
                                push("/wallets");
                            }, type: "submit", className: "bg-primary mx-center text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer" }, "Back To Wallet")))))),
        react_1["default"].createElement(react_hot_toast_1.Toaster, null)));
};
exports["default"] = Send;
