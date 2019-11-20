// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

var express = require('express');

var app = express();

app.use(express.static('public'));
