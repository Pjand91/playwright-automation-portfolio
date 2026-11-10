# Playwright Payment Withdrawal Testing Demo

## Overview

An independent Playwright and TypeScript project demonstrating automated testing of a payment withdrawal flow.

The focus is on validating different payment provider responses, especially delayed confirmations.

## Scenario

A payment provider may return three transaction statuses:

- Success: the withdrawal has completed.
- Failed: the withdrawal has failed.
- Pending: the provider has received the request but has not confirmed the final outcome.

## Test Coverage

| Test | Expected result |
|---|---|
| Successful withdrawal | Success message displayed |
| Failed withdrawal | Failure message displayed |
| Pending withdrawal | Pending message displayed, not failure |

## Technologies

- Playwright
- TypeScript
- Node.js
- Playwright API route mocking

## Run the tests

Install dependencies:

    npm install

Run the withdrawal tests:

    npx playwright test tests/withdrawal.spec.ts --project=chromium

Run the complete test suite:

    npx playwright test

## Test approach

Provider responses are simulated using Playwright route interception. This allows reliable testing of transaction states without processing real payments.

## Scope

This is an independent demonstration project. It contains no proprietary code, data, or systems from previous employers.
