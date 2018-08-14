/*
 * Copyright (C) 2018 David Craven and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { injectable } from 'inversify'
import { LanguageGrammarDefinitionContribution, TextmateRegistry
       } from '@theia/monaco/lib/browser/textmate'
import { VERILOG_LANGUAGE_ID, VERILOG_LANGUAGE_NAME } from '../common';

@injectable()
export class VerilogGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}'], ['[', ']'], ['(', ')']],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"', notIn: ['string'] },
            { open: "'", close: "'", notIn: ['string'] },
            { open: '/**', close: ' */', notIn: ['string'] },
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: "'", close: "'" },
            { open: '"', close: '"' }
        ],
    }

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: VERILOG_LANGUAGE_ID,
            extensions: ['.v', '.vh'],
            aliases: [VERILOG_LANGUAGE_NAME, 'verilog'],
            mimetypes: ['text/x-verilog-source', 'text/x-verilog'],
        });

        monaco.languages.setLanguageConfiguration(VERILOG_LANGUAGE_ID, this.config)

        const verilogGrammar = require('../../data/verilog.tmLanguage.json')
        registry.registerTextMateGrammarScope('source.verilog', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: verilogGrammar
                }
            }
        });

        registry.mapLanguageIdToTextmateGrammar(VERILOG_LANGUAGE_ID, 'source.verilog');
    }
}
