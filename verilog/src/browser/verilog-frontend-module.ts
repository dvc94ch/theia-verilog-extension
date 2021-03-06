/*
 * Copyright (C) 2018 David Craven and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { VerilogGrammarContribution } from './verilog-grammar-contribution';

export default new ContainerModule(bind => {
    bind(LanguageGrammarDefinitionContribution).to(VerilogGrammarContribution)
        .inSingletonScope();
});
