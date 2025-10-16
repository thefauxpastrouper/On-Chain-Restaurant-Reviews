# On-Chain Restaurant Reviews 🍽️

A decentralized web application (dApp) that allows users to create and register restaurants, and receive reviews from other users — all stored **on-chain** for transparency and immutability.

---

## Table of Contents

- [Introduction](#introduction)  
- [Features](#features)  
- [Architecture & Tech Stack](#architecture--tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Usage](#usage)  
- [Deployment](#deployment)  
- [Folder Structure](#folder-structure)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Introduction

On-Chain Restaurant Reviews is a blockchain-powered review platform where:

- Restaurant owners or users can **register a restaurant** on-chain.  
- Other users can submit **reviews**, ratings, comments, etc.  
- All data is stored on the blockchain, ensuring transparency, immutability, and censorship resistance.

This model replaces traditional centralized review sites by putting control and trust in the hands of users and smart contracts.

---

## Features

- Create/Register restaurants on-chain  
- Submit reviews for restaurants  
- Immutable and transparent storage of reviews  
- Frontend UI using modern React + TypeScript  
- Tailwind CSS + shadcn-ui for styling and component library  
- Vite as build tool and dev server  

---

## Architecture & Tech Stack

- **Frontend**: React, TypeScript, Vite  
- **UI / Styling**: Tailwind CSS, shadcn-ui  
- **Smart Contracts / On-chain Logic**: (Assumed) Ethereum / EVM compatible chain  
- **Configuration / Build**:  
  - `tsconfig.*.json`  
  - `vite.config.ts`  
  - `tailwind.config.ts`  
  - `postcss.config.js`  

---

## Getting Started

### Prerequisites

- Node.js (v16+)  
- npm or yarn  
- (Optional) A local blockchain / testnet / wallet to interact with the smart contracts  

### Installation

```bash
git clone https://github.com/thefauxpastrouper/On-Chain-Restaurant-Reviews.git
cd On-Chain-Restaurant-Reviews
npm install
