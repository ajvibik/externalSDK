import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarWebPrintExtManagerService {

  constructor() { }

  //
  // StarWebPrintExtManager API
  //
  // Version 1.1.0
  //
  // Copyright (C) 2016-2018 STAR MICRONICS CO., LTD. All Rights Reserved.
  //

  StarWebPrintExtManager = function (a) {
    this.url = this.onStatusUpdate = this.onWrite = this.onAccessoryDisconnect = this.onAccessoryConnectFailure = this.onAccessoryConnectSuccess = this.onDisplayDisconnect = this.onDisplayConnect = this.onDisplayImpossible = this.onBarcodeDataReceive = this.onBarcodeReaderDisconnect = this.onBarcodeReaderConnect = this.onBarcodeReaderImpossible = this.onCashDrawerClose = this.onCashDrawerOpen = this.onPrinterCoverClose = this.onPrinterCoverOpen = this.onPrinterPaperEmpty = this.onPrinterPaperNearEmpty =
      this.onPrinterPaperReady = this.onPrinterOffline = this.onPrinterOnline = this.onPrinterImpossible = this.onError = this.onReceive = null; this.pollingInterval = 200; this.pollingTimeout = 3E4; this.isWaitWriteCallback = this.isWaitCallback = !1; this.claimId = 0; this.isReleaseRequest = this.isPolling = !1; void 0 != a && (void 0 != a.pollingTimeout && (this.pollingTimeout = a.pollingTimeout), void 0 != a.pollingInterval && (this.pollingInterval = a.pollingInterval), void 0 != a.url && (this.url = a.url))
  };
  connect = function (a) { void 0 != a && (void 0 != a.pollingTimeout && (this.pollingTimeout = a.pollingTimeout), void 0 != a.pollingInterval && (this.pollingInterval = a.pollingInterval), void 0 != a.url && (this.url = a.url)); return !this.isPolling && !this.isWaitCallback ? (this.isReleaseRequest = !1, this._sendExtMessage({ requestType: "claim", isNeedExternalCallBack: !0 }), !0) : !1 };
  disconnect = function () { return !this.isReleaseRequest && this.isPolling && !this.isWaitCallback ? this.isReleaseRequest = !0 : !1 }; write = function (a) { if (void 0 == a.request) return !1; 0 == this.claimId && void 0 != a.url && (this.url = a.url); this._sendExtMessage({ requestType: "write", isNeedExternalCallBack: !0, request: a.request }); return !0 }; _getPollingInterval = function () { 100 > this.pollingInterval && (this.pollingInterval = 100); return this.pollingInterval };
  _getPollingTimeout = function () { 1E4 > this.pollingTimeout && (this.pollingTimeout = 1E4); return this.pollingTimeout }; _polling = function () { this.isReleaseRequest ? (this.isReleaseRequest = !1, this._sendExtMessage({ requestType: "release", isNeedExternalCallBack: !0 }), this._clearClaimId()) : this._sendExtMessage({ requestType: "read", isNeedExternalCallBack: !1 }) };
  _analyzeXml = function (a) {
    d = new DOMParser, this.e, this.c; this.e = d.parseFromString(a.responseText, "text/xml"); this.c = this.e.getElementsByTagName("Response"); this.e = d.parseFromString(this.c.item(0).textContent, "text/xml"); this.e.getElementsByTagName("root"); this.c = this.e.getElementsByTagName("claimid").item(0); var f = this.e.getElementsByTagName("claim").item(0), d = this.e.getElementsByTagName("event"); a.managerClaim = f.textContent; a.managerSuccess = a.traderSuccess; a.managerCode = a.traderCode; a.traderSuccess = void 0; a.traderCode = void 0;
    a.traderStatus = void 0; if ("true" == a.managerSuccess) {
      if ("true" == a.managerClaim) {
        void 0 != this.c && (this.claimId = this.c.textContent, this.isPolling = !0); var b = this; this.c = {
          onPrinterImpossible: function () { b.onPrinterImpossible() }, onPrinterOnline: function () { b.onPrinterOnline() }, onPrinterOffline: function () { b.onPrinterOffline() }, onPrinterPaperReady: function () { b.onPrinterPaperReady() }, onPrinterPaperNearEmpty: function () { b.onPrinterPaperNearEmpty() }, onPrinterPaperEmpty: function () { b.onPrinterPaperEmpty() }, onPrinterCoverOpen: function () { b.onPrinterCoverOpen() },
          onPrinterCoverClose: function () { b.onPrinterCoverClose() }, onCashDrawerOpen: function () { b.onCashDrawerOpen() }, onCashDrawerClose: function () { b.onCashDrawerClose() }, onBarcodeReaderImpossible: function () { b.onBarcodeReaderImpossible() }, onBarcodeReaderConnect: function () { b.onBarcodeReaderConnect() }, onBarcodeReaderDisconnect: function () { b.onBarcodeReaderDisconnect() }, onBarcodeDataReceive: function (a) { b.onBarcodeDataReceive({ data: a }) }, onDisplayImpossible: function () { b.onDisplayImpossible() }, onDisplayConnect: function () { b.onDisplayConnect() },
          onDisplayDisconnect: function () { b.onDisplayDisconnect() }, onAccessoryConnectSuccess: function () { b.onAccessoryConnectSuccess() }, onAccessoryConnectFailure: function () { b.onAccessoryConnectFailure() }, onAccessoryDisconnect: function () { b.onAccessoryDisconnect() }, onWrite: function () { b.onWrite() }, onStatusUpdate: function (a) { b.onStatusUpdate({ status: a }) }
        }; f = 0; if (this.isPolling || this.isWaitWriteCallback) {
          void 0 != this.e.getElementsByTagName("eventcount") && (f = this.e.getElementsByTagName("eventcount").item(0).textContent); for (this.e =
            0; this.e < f; this.e++)for (var g = 0; g < this.d.length; g++) { var h = this.d.item(g).getElementsByTagName("action").item(0).textContent; if (this.d.item(g).getElementsByTagName("number").item(0).textContent == this.e) if ("onBarcodeDataReceive" == h || "onStatusUpdate" == h) { var k = d.item(g).getElementsByTagName("data").item(0).textContent; try { this.c[h](k) } catch (l) { } } else try { this.c[h]() } catch (m) { } }
        }
      }
    } else 1200 != a.managerCode && this._clearClaimId(); return a
  }; _clearClaimId = function () { this.claimId = 0; this.isPolling = !1 };
  _sendExtMessage = function (a) {
    a.isNeedExternalCallBack && ("write" == a.requestType ? this.isWaitWriteCallback = !0 : this.isWaitCallback = !0); var d = "<extmanager "; "claim" == a.requestType || "read" == a.requestType || "write" == a.requestType ? (d += 'request_type="' + a.requestType + '" ', "claim" == a.requestType && (d += 'polling_timeout="' + this._getPollingTimeout() + '" ')) : d += 'request_type="release" '; 0 != this.claimId && (d += 'claimid="' + this.claimId + '" '); d += ">"; "write" == a.requestType && void 0 != a.request &&
      (d += a.request); var d = d + "</extmanager>", e = new this.StarWebPrintTrader, c = this, f = this._getPollingTimeout(); "write" == a.requestType ? (e.onReceive = function (b) { b = c._analyzeXml(b); if (a.isNeedExternalCallBack || "false" == b.managerSuccess) { if (void 0 != c.onReceive) c.onReceive(b); c.isWaitWriteCallback = !1 } }, e.onError = function (a) { c.isWaitWriteCallback = !1; c._clearClaimId(); if (void 0 != c.onError) c.onError(a) }) : (e.onReceive = function (b) {
        b = c._analyzeXml(b); if (a.isNeedExternalCallBack || "false" == b.managerSuccess) {
          if (void 0 != c.onReceive) c.onReceive(b);
          c.isWaitCallback = !1
        } c.isPolling && setTimeout(function () { c._polling() }, c._getPollingInterval())
      }, e.onError = function (a) { c.isWaitCallback = !1; c._clearClaimId(); if (void 0 != c.onError) c.onError(a) }); e.sendMessage({ url: this.url, request: d, timeout: f })
  };

}
