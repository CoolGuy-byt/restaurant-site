/**
 * Restaurant Reservation Form
 * Client-side validation, form submission via fetch,
 * loading / success / error states.
 */

(function () {
  "use strict";

  // ── DOM references ──────────────────────────────────────
  var form            = document.getElementById("reservation-form");
  var submitBtn       = document.getElementById("res-submit-btn");
  var btnText         = submitBtn.querySelector(".btn-text");
  var btnLoading      = submitBtn.querySelector(".btn-loading");

  var fieldIdMap = {
    name:  document.getElementById("res-name"),
    email: document.getElementById("res-email"),
    date:  document.getElementById("res-date"),
    time:  document.getElementById("res-time"),
    guests: document.getElementById("res-guests"),
  };

  var errorMap = {
    name:   document.getElementById("name-error"),
    email:  document.getElementById("email-error"),
    date:   document.getElementById("date-error"),
    time:   document.getElementById("time-error"),
    guests: document.getElementById("guests-error"),
  };

  var successPanel = document.getElementById("reservation-success");
  var resetBtn     = document.getElementById("res-reset-btn");

  var todayStr = formatDate(new Date()); // "YYYY-MM-DD" for today

  // Set min date on the date picker so past dates are blocked by the UI
  document.getElementById("res-date").setAttribute("min", todayStr);

  // ── Validation helpers ──────────────────────────────────
  var validators = {
    name: function (val) {
      if (!val.trim()) return "Please enter your full name.";
      if (val.trim().length < 2) return "Name must be at least 2 characters.";
      return "";
    },

    email: function (val) {
      if (!val.trim()) return "Email address is required.";
      // RFC 5322 simplified check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return "Please enter a valid email address.";
      return "";
    },

    date: function (val) {
      if (!val) return "Please select a date.";
      var selected = new Date(val + "T00:00:00");
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (selected < now) return "Please choose a future date.";
      return "";
    },

    time: function (val) {
      if (!val) return "Please select a time.";
      return "";
    },

    guests: function (val) {
      if (!val) return "Number of guests is required.";
      var n = parseInt(val, 10);
      if (isNaN(n) || n < 1) return "Guests must be at least 1.";
      if (n > 20) return "Maximum 20 guests per reservation.";
      return "";
    },
  };

  // ── Validation UI ───────────────────────────────────────
  function setFieldError(fieldName, message) {
    var input = fieldIdMap[fieldName];
    var error = errorMap[fieldName];
    if (!input || !error) return;

    error.textContent = message;
    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");
  }

  function clearFieldError(fieldName) {
    var input = fieldIdMap[fieldName];
    var error = errorMap[fieldName];
    if (!input || !error) return;

    error.textContent = "";
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");
  }

  function validateForm() {
    var isValid = true;
    var fields = ["name", "email", "date", "time", "guests"];

    fields.forEach(function (field) {
      var value = fieldIdMap[field].value;
      var msg = validators[field](value);
      if (msg) {
        setFieldError(field, msg);
        isValid = false;
      } else {
        clearFieldError(field);
      }
    });

    return isValid;
  }

  // ── Loading state ───────────────────────────────────────
  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.hidden = true;
      btnLoading.hidden = false;
    } else {
      submitBtn.disabled = false;
      btnText.hidden = false;
      btnLoading.hidden = true;
    }
  }

  // ── Success / error display ─────────────────────────────
  function showSuccess(data) {
    form.hidden = true;
    submitBtn.hidden = true;

    var nameEl      = document.getElementById("success-name");
    var guestsEl    = document.getElementById("success-guests");
    var dateTimeEl  = document.getElementById("success-date-time");
    var emailEl     = document.getElementById("success-email");

    nameEl.textContent = data.name;
    guestsEl.textContent = data.guests + (data.guests === "1" ? " guest" : " guests");
    dateTimeEl.textContent = data.date + " at " + data.time;
    emailEl.textContent = data.email;

    successPanel.hidden = false;
  }

  function showError(message) {
    // Create a top-level error banner (outside the form) if not already present
    var banner = document.getElementById("form-global-error");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "form-global-error";
      banner.className = "global-error";
      banner.setAttribute("role", "alert");
      banner.setAttribute("aria-live", "assertive");
      form.parentNode.insertBefore(banner, form);
    }
    banner.textContent = message;
    banner.hidden = false;
    // Re-show form if it was hidden by success
    form.hidden = false;
    submitBtn.hidden = false;
    successPanel.hidden = true;
  }

  function clearGlobalError() {
    var banner = document.getElementById("form-global-error");
    if (banner) {
      banner.textContent = "";
      banner.hidden = true;
    }
  }

  // ── Form submission ─────────────────────────────────────
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearGlobalError();

    if (!validateForm()) return;

    var payload = {
      name:    fieldIdMap.name.value.trim(),
      email:   fieldIdMap.email.value.trim(),
      date:    fieldIdMap.date.value,
      time:    fieldIdMap.time.value,
      guests:  String(fieldIdMap.guests.value),
    };

    setLoading(true);

    fetch("REPLACE_WITH_RESERVATION_WEBHOOK_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Server responded with status " + response.status);
        }
        // Attempt to parse JSON; fall back to raw payload for display
        return response.json().then(function (json) {
          return json || payload;
        }).catch(function () {
          return payload;
        });
      })
      .then(function (data) {
        showSuccess(data);
      })
      .catch(function (err) {
        showError("Something went wrong. Please try again later.");
        setLoading(false);
      });
  });

  // ── Reset button (allows a fresh attempt without refresh) ──
  resetBtn.addEventListener("click", function () {
    form.reset();
    form.hidden = false;
    submitBtn.hidden = false;
    successPanel.hidden = true;
    clearGlobalError();

    // Clear all per-field errors
    Object.keys(fieldIdMap).forEach(function (field) {
      clearFieldError(field);
    });

    setLoading(false);
  });

  // ── Inline validation on blur (good UX) ─────────────────
  Object.keys(fieldIdMap).forEach(function (field) {
    fieldIdMap[field].addEventListener("blur", function () {
      var msg = validators[field](this.value);
      if (msg) {
        setFieldError(field, msg);
      } else {
        clearFieldError(field);
      }
    });
  });

  // ── Helper ──────────────────────────────────────────────
  function formatDate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
})();
