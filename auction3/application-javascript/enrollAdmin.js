/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const mspOrg1 = 'Org1MSP';
const mspOrg2 = 'Org2MSP';
const mspOrg3 = 'Org3MSP';

async function connectToOrg1CA() {
	console.log('\n--> Enrolling the Org1 CA admin');
	const ccpOrg1 = buildCCPOrg1();
	const caOrg1Client = buildCAClient(FabricCAServices, ccpOrg1, 'ca.org1.example.com');

	const walletPathOrg1 = path.join(__dirname, 'wallet/org1');
	const walletOrg1 = await buildWallet(Wallets, walletPathOrg1);

	await enrollAdmin(caOrg1Client, walletOrg1, mspOrg1);

}

async function connectToOrg2CA() {
	console.log('\n--> Enrolling the Org2 CA admin');
	const ccpOrg2 = buildCCPOrg2();
	const caOrg2Client = buildCAClient(FabricCAServices, ccpOrg2, 'ca.org2.example.com');

	const walletPathOrg2 = path.join(__dirname, 'wallet/org2');
	const walletOrg2 = await buildWallet(Wallets, walletPathOrg2);

	await enrollAdmin(caOrg2Client, walletOrg2, mspOrg2);

}

async function connectToOrg3CA() {
	console.log('\n--> Enrolling the Org3 CA admin');
	const ccpOrg3 = buildCCPOrg3();
	const caOrg3Client = buildCAClient(FabricCAServices, ccpOrg3, 'ca.org3.example.com');

	const walletPathOrg3 = path.join(__dirname, 'wallet/org3');
	const walletOrg3 = await buildWallet(Wallets, walletPathOrg3);

	await enrollAdmin(caOrg3Client, walletOrg3, mspOrg3);
	
}

async function main() {

	if (process.argv[2] === undefined) {
		console.log('Usage: node enrollAdmin.js Org');
		process.exit(1);
	}

	const org = process.argv[2];

	try {

		if (org === 'Org1' || org === 'org1') {
			await connectToOrg1CA();
		}
		else if (org === 'Org2' || org === 'org2') {
			await connectToOrg2CA();
		}
		else if (org === 'Org3' || org === 'org3') {
			await connectToOrg3CA();
		} else {
			console.log('Usage: node registerUser.js org userID');
			console.log('Org must be Org1 or Org2');
		}
	} catch (error) {
		console.error(`Error in enrolling admin: ${error}`);
		process.exit(1);
	}
}

main();
