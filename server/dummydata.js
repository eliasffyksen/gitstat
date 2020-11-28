module.exports = [
      {
        "old": "#include <stdio.h>\n",
        "new": "#include <stdio.h>\n"
      },
      {
        "old": "#include <stdint.h>\n",
        "new": "#include <stdint.h>\n"
      },
      {
        "old": "#include <limits.h>\n",
        "new": "#include <limits.h>\n"
      },
      {
        "old": "#include <stdbool.h>\n",
        "new": "#include <stdbool.h>\n"
      },
      {
        "old": "#include <stdio.h>\n",
        "new": "#include <stdio.h>\n"
      },
      {
        "old": "#include <string.h>\n",
        "new": "#include <string.h>\n"
      },
      {
        "old": null,
        "new": "#include <ctype.h>\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "enum format_type {\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_NONE, // Just a string part\n",
        "new": null
      },
      {
        "old": "    FORMAT_TYPE_WIDTH,\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_CHAR,\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_STR,\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_PERCENT_CHAR,\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_INVALID,\n",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_INT\n",
        "new": null
      },
      {
        "old": "};\n",
        "new": null
      },
      {
        "old": null,
        "new": "#define ONE_OF(val, ...) \\\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "//Whether the number is of a signed type\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_SIGNED      1 << 0\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "//Left-justifies the conversion within the field\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_LEFT        1 << 1\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "//Prefixes positive numbers with a '+'\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_PLUS        1 << 2 \n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_SPACE       1 << 3 \n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_ALTERNATIVE 1 << 4 \n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "//Number is padded to field width with 0s\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_ZERO        1 << 5 \n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "//Formats with lowercase chars, as opposed to uppercase (for hex, INFINITY, NAN)\n"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_LOWER       1 << 6\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "#define FIELD_WIDTH_MAX ((1 << 23) - 1)\n",
        "new": null
      },
      {
        "old": null,
        "new": "enum token_type {\n"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_INVALID,\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "#define NUMBER_FLAG_SIGN    1 << 0\n",
        "new": null
      },
      {
        "old": "#define NUMBER_FLAG_ZEROPAD 1 << 1\n",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: remove\n"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_TEST,\n"
      },
      {
        "old": null,
        "new": "    //Plain string, no vararg\n"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_TEXT,\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "struct printf_spec {\n",
        "new": null
      },
      {
        "old": "    enum format_type type:8;\n",
        "new": null
      },
      {
        "old": "    uint8_t base:8;\n",
        "new": null
      },
      {
        "old": "    int32_t field_width:24;\n",
        "new": null
      },
      {
        "old": "    uint8_t number_flags:8;\n",
        "new": null
      },
      {
        "old": "} __packed;\n",
        "new": null
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_STR,\n"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_CHAR,\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "static bool print(const char* data, size_t length) {\n",
        "new": null
      },
      {
        "old": "    const unsigned char* bytes = (const unsigned char*) data;\n",
        "new": null
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_INT,\n"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_UINT,\n"
      },
      {
        "old": null,
        "new": "};\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "struct format_token {\n"
      },
      {
        "old": null,
        "new": "    uint8_t type;\n"
      },
      {
        "old": null,
        "new": "    uint8_t flags;  \n"
      },
      {
        "old": null,
        "new": "    uint8_t base;\n"
      },
      {
        "old": null,
        "new": "    unsigned int width;\n"
      },
      {
        "old": null,
        "new": "};\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "static bool print_len(const char *data, size_t length) {\n"
      },
      {
        "old": "    for (size_t i = 0; i < length; ++i) {\n",
        "new": "    for (size_t i = 0; i < length; ++i) {\n"
      },
      {
        "old": "        if (putchar(bytes[i]) == EOF) {\n",
        "new": null
      },
      {
        "old": null,
        "new": "        if (putchar(data[i]) == EOF) {\n"
      },
      {
        "old": "            return false;\n",
        "new": "            return false;\n"
      },
      {
        "old": "        }\n",
        "new": "        }\n"
      },
      {
        "old": "    }\n",
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    return true;\n",
        "new": "    return true;\n"
      },
      {
        "old": "}\n",
        "new": "}\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "static size_t itoa(char* out_num, int num, struct printf_spec spec) {\n",
        "new": null
      },
      {
        "old": null,
        "new": "static bool print(const char *data) {\n"
      },
      {
        "old": null,
        "new": "    return print_len(data, strlen(data));\n"
      },
      {
        "old": null,
        "new": "}\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "static size_t itoa(char *out_num, unsigned long long num, struct format_token *token) {\n"
      },
      {
        "old": "    size_t len = 0;\n",
        "new": "    size_t len = 0;\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    bool add_sign = false;\n",
        "new": null
      },
      {
        "old": "    if (num < 0 && spec.number_flags & NUMBER_FLAG_SIGN) {\n",
        "new": null
      },
      {
        "old": "        num *= -1;\n",
        "new": null
      },
      {
        "old": "        add_sign = true;\n",
        "new": null
      },
      {
        "old": null,
        "new": "    char *p = out_num;\n"
      },
      {
        "old": null,
        "new": "    if (token->flags & TOKEN_FLAG_SIGNED && ((signed) len) < 0) {\n"
      },
      {
        "old": null,
        "new": "        *p++ = '-';\n"
      },
      {
        "old": null,
        "new": "        num = ((signed) num) * -1;\n"
      },
      {
        "old": "    }\n",
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    //outputs edx hex in reverse order into tmp\n",
        "new": null
      },
      {
        "old": "    while (num != 0) {\n",
        "new": null
      },
      {
        "old": "        int remainder = num % spec.base;\n",
        "new": null
      },
      {
        "old": "        if (remainder < 10) {\n",
        "new": null
      },
      {
        "old": "            out_num[len] = remainder + '0';\n",
        "new": null
      },
      {
        "old": null,
        "new": "    //Get to where the number ends;\n"
      },
      {
        "old": null,
        "new": "    unsigned long long shifter = num;\n"
      },
      {
        "old": null,
        "new": "    unsigned int digits = 0;\n"
      },
      {
        "old": null,
        "new": "    unsigned int filler_chars = 0;\n"
      },
      {
        "old": null,
        "new": "    do {\n"
      },
      {
        "old": null,
        "new": "        ++p;\n"
      },
      {
        "old": null,
        "new": "        ++digits;\n"
      },
      {
        "old": null,
        "new": "        if (shifter) {\n"
      },
      {
        "old": null,
        "new": "            shifter /= token->base;\n"
      },
      {
        "old": "        } else {\n",
        "new": "        } else {\n"
      },
      {
        "old": "            out_num[len] = remainder + 'A' - 10;\n",
        "new": null
      },
      {
        "old": null,
        "new": "            ++filler_chars;\n"
      },
      {
        "old": "        }\n",
        "new": "        }\n"
      },
      {
        "old": null,
        "new": "    } while (shifter || digits < token->width);\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "        num /= spec.base;\n",
        "new": null
      },
      {
        "old": "        ++len;\n",
        "new": null
      },
      {
        "old": "    } \n",
        "new": null
      },
      {
        "old": null,
        "new": "    *p = '\\0';\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    if (add_sign) {\n",
        "new": null
      },
      {
        "old": "        out_num[len] = '-';\n",
        "new": null
      },
      {
        "old": "        ++len;\n",
        "new": null
      },
      {
        "old": "    }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: Right justifcation\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "    do {\n"
      },
      {
        "old": null,
        "new": "        //gets stuck\n"
      },
      {
        "old": null,
        "new": "        int val = num % token->base;\n"
      },
      {
        "old": null,
        "new": "        if (val < 10) {\n"
      },
      {
        "old": null,
        "new": "            *(--p) = '0' + val;\n"
      },
      {
        "old": null,
        "new": "        } else {\n"
      },
      {
        "old": null,
        "new": "            *(--p) = ((token->flags & TOKEN_FLAG_LOWER) ? 'a' : 'A') + val - 10;\n"
      },
      {
        "old": null,
        "new": "        }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    //Reverse out_num to get it into the correct order\n",
        "new": null
      },
      {
        "old": "    char *p1, *p2;\n",
        "new": null
      },
      {
        "old": "    \n",
        "new": null
      },
      {
        "old": "    p1 = out_num;\n",
        "new": null
      },
      {
        "old": "    p2 = out_num + (len - 1);\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "    while (p1 < p2) {\n",
        "new": null
      },
      {
        "old": "        char tmp = *p1;\n",
        "new": null
      },
      {
        "old": "        *p1 = *p2;\n",
        "new": null
      },
      {
        "old": "        *p2 = tmp;\n",
        "new": null
      },
      {
        "old": "        ++p1;\n",
        "new": null
      },
      {
        "old": "        --p2;\n",
        "new": null
      },
      {
        "old": null,
        "new": "        \n"
      },
      {
        "old": null,
        "new": "        num /= token->base;\n"
      },
      {
        "old": null,
        "new": "    } while (num);\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "    //Add preceeding 0s or spaces\n"
      },
      {
        "old": null,
        "new": "    for (int i = 0; i < filler_chars; ++i) {\n"
      },
      {
        "old": null,
        "new": "        *(--p) = (token->flags & TOKEN_FLAG_ZERO) ? '0' : ' ';\n"
      },
      {
        "old": "    }\n",
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    return len;\n",
        "new": "    return len;\n"
      },
      {
        "old": "}\n",
        "new": "}\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "int vprintf(const char* format, va_list vlist) {\n",
        "new": null
      },
      {
        "old": "    struct printf_spec spec = {0};\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "    int written = 0;\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "    while(*format != '\\0') {\n",
        "new": null
      },
      {
        "old": "        size_t max_remain = INT_MAX - written;\n",
        "new": null
      },
      {
        "old": null,
        "new": "static size_t atoi(const char *fmt, unsigned int *num) {\n"
      },
      {
        "old": null,
        "new": "    size_t len = 0;\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "        if (format[0] == '%' && format[1] == '%') {\n",
        "new": null
      },
      {
        "old": "            ++format;\n",
        "new": null
      },
      {
        "old": "        }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    while (isdigit(*fmt)) {\n"
      },
      {
        "old": null,
        "new": "        *num = *num * 10 + (*fmt - '0');        \n"
      },
      {
        "old": null,
        "new": "        ++len;\n"
      },
      {
        "old": null,
        "new": "        ++fmt;\n"
      },
      {
        "old": null,
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "        //if the next character is not a format token, write until the next % or until the end\n",
        "new": null
      },
      {
        "old": "        if (format[0] != '%' || format[1] == '%') {\n",
        "new": null
      },
      {
        "old": "            if (format[0] == '%') {\n",
        "new": null
      },
      {
        "old": "                ++format;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    return len;\n"
      },
      {
        "old": null,
        "new": "}\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            size_t amount = 1;\n",
        "new": null
      },
      {
        "old": "            while (format[amount] && format[amount] != '%') {\n",
        "new": null
      },
      {
        "old": "                ++amount;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "static int process_token(const char *fmt, va_list vlist, struct format_token *token) {\n"
      },
      {
        "old": null,
        "new": "    const char *start = fmt;\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (amount > max_remain) {\n",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    for (; *fmt && *fmt != '%'; fmt++);\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (!print(format, amount)) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    if (fmt != start) {\n"
      },
      {
        "old": null,
        "new": "        token->type = TOKEN_TYPE_TEXT;\n"
      },
      {
        "old": null,
        "new": "        return fmt - start;\n"
      },
      {
        "old": null,
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            format += amount;\n",
        "new": null
      },
      {
        "old": "            written += amount;\n",
        "new": null
      },
      {
        "old": "            continue;\n",
        "new": null
      },
      {
        "old": null,
        "new": "    ++fmt;\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "    bool at_flags = true;\n"
      },
      {
        "old": null,
        "new": "    while (at_flags) {\n"
      },
      {
        "old": null,
        "new": "        switch (*fmt) {\n"
      },
      {
        "old": null,
        "new": "            case '-': token->flags |= TOKEN_FLAG_LEFT; break;\n"
      },
      {
        "old": null,
        "new": "            case '+': token->flags |= TOKEN_FLAG_PLUS; break;\n"
      },
      {
        "old": null,
        "new": "            case ' ': token->flags |= TOKEN_FLAG_SPACE; break;\n"
      },
      {
        "old": null,
        "new": "            case '#': token->flags |= TOKEN_FLAG_ALTERNATIVE; break;\n"
      },
      {
        "old": null,
        "new": "            case '0': token->flags |= TOKEN_FLAG_ZERO; break;\n"
      },
      {
        "old": null,
        "new": "            default:\n"
      },
      {
        "old": null,
        "new": "                      at_flags = false;\n"
      },
      {
        "old": null,
        "new": "                      break;\n"
      },
      {
        "old": "        }\n",
        "new": "        }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "        const char next = *(format + 1);\n",
        "new": null
      },
      {
        "old": "        //check the next character for the format specifier\n",
        "new": null
      },
      {
        "old": "        if (next == 'c') {\n",
        "new": null
      },
      {
        "old": "            format += 2;\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "            char c = (char) va_arg(vlist, int /* char promotes to int in parameters */);\n",
        "new": null
      },
      {
        "old": "            if (max_remain == 0) {\n",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "            if (!print(&c, sizeof(c))) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "            ++written;\n",
        "new": null
      },
      {
        "old": "        } else if (next == 's') {\n",
        "new": null
      },
      {
        "old": "            format += 2;\n",
        "new": null
      },
      {
        "old": "            const char* str = va_arg(vlist, const char*);\n",
        "new": null
      },
      {
        "old": "            size_t len = strlen(str);\n",
        "new": null
      },
      {
        "old": "\n",
        "new": null
      },
      {
        "old": "            if (len > max_remain) {\n",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "        if (at_flags) {\n"
      },
      {
        "old": null,
        "new": "            ++fmt;\n"
      },
      {
        "old": null,
        "new": "        }\n"
      },
      {
        "old": null,
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (!print(str, len)) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "    if (isdigit(*fmt)) {\n"
      },
      {
        "old": null,
        "new": "        unsigned int width = 0;\n"
      },
      {
        "old": null,
        "new": "        fmt += atoi(fmt, &width);\n"
      },
      {
        "old": null,
        "new": "        token->width = width;\n"
      },
      {
        "old": null,
        "new": "    } else if (*fmt == '*') {\n"
      },
      {
        "old": null,
        "new": "        token->width = va_arg(vlist, unsigned int);\n"
      },
      {
        "old": null,
        "new": "        ++fmt; \n"
      },
      {
        "old": null,
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            written += len;\n",
        "new": null
      },
      {
        "old": "        } else if (next == 'd') {\n",
        "new": null
      },
      {
        "old": "            format += 2;\n",
        "new": null
      },
      {
        "old": "            int number = va_arg(vlist, int);\n",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: Precision\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "    //TODO: Length modifiers\n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "    switch (*fmt) {\n"
      },
      {
        "old": null,
        "new": "        case 'd':\n"
      },
      {
        "old": null,
        "new": "        case 'i': \n"
      },
      {
        "old": null,
        "new": "            token->base = 10;\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_INT;            \n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        case 'o':\n"
      },
      {
        "old": null,
        "new": "            token->base = 8;\n"
      },
      {
        "old": null,
        "new": "        case 'u':\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_UINT;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        case 'x':\n"
      },
      {
        "old": null,
        "new": "            token->flags |= TOKEN_FLAG_LOWER;\n"
      },
      {
        "old": null,
        "new": "        case 'X':\n"
      },
      {
        "old": null,
        "new": "            token->base = 16;\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_UINT;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        case 'c':\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_CHAR;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        case 's':\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_STR;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        case '%':\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_TEXT;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "        default:\n"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_INVALID;\n"
      },
      {
        "old": null,
        "new": "            break;\n"
      },
      {
        "old": null,
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            spec.base = 10;\n",
        "new": null
      },
      {
        "old": "            spec.number_flags |= NUMBER_FLAG_SIGN;\n",
        "new": null
      },
      {
        "old": "            char str[12];\n",
        "new": null
      },
      {
        "old": "            size_t len = itoa(str, number, spec);\n",
        "new": null
      },
      {
        "old": null,
        "new": "    return ++fmt - start;\n"
      },
      {
        "old": null,
        "new": "}\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (len > max_remain) {\n",
        "new": null
      },
      {
        "old": "                //TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (!print(str, len)) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "int vprintf(const char *fmt, va_list vlist) {\n"
      },
      {
        "old": null,
        "new": "    size_t written = 0;\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            written += len;\n",
        "new": null
      },
      {
        "old": null,
        "new": "    while (*fmt != '\\0') {\n"
      },
      {
        "old": null,
        "new": "        struct format_token token = {0}; \n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "        } else if (next == 'x') {\n",
        "new": null
      },
      {
        "old": "            format += 2;\n",
        "new": null
      },
      {
        "old": "            int number = va_arg(vlist, int);\n",
        "new": null
      },
      {
        "old": null,
        "new": "        size_t length = process_token(fmt, vlist, &token);\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            spec.base = 16;\n",
        "new": null
      },
      {
        "old": "            spec.number_flags &= ~(NUMBER_FLAG_SIGN);\n",
        "new": null
      },
      {
        "old": "            char str[9];\n",
        "new": null
      },
      {
        "old": "            size_t len = itoa(str, number, spec);\n",
        "new": null
      },
      {
        "old": null,
        "new": "        switch (token.type) {\n"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_INVALID:\n"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_TEXT:\n"
      },
      {
        "old": null,
        "new": "                if (!print_len(fmt, length)) {\n"
      },
      {
        "old": null,
        "new": "                    return -1;\n"
      },
      {
        "old": null,
        "new": "                }\n"
      },
      {
        "old": null,
        "new": "                break;\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (len > max_remain) {\n",
        "new": null
      },
      {
        "old": "                //TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": "            }\n",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_CHAR: {\n"
      },
      {
        "old": null,
        "new": "                char c;\n"
      },
      {
        "old": null,
        "new": "                c = (char) va_arg(vlist, int);\n"
      },
      {
        "old": null,
        "new": "                if (!putchar(c)) {\n"
      },
      {
        "old": null,
        "new": "                    return -1;\n"
      },
      {
        "old": null,
        "new": "                }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            if (!print(str, len)) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": null,
        "new": "                break;\n"
      },
      {
        "old": "            }\n",
        "new": "            }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            written += len;\n",
        "new": null
      },
      {
        "old": "        } else {\n",
        "new": null
      },
      {
        "old": "            if (max_remain < 2) {\n",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_STR: {\n"
      },
      {
        "old": null,
        "new": "                const char *str;\n"
      },
      {
        "old": null,
        "new": "                str = va_arg(vlist, const char *);\n"
      },
      {
        "old": null,
        "new": "                print(str);\n"
      },
      {
        "old": null,
        "new": "                break;\n"
      },
      {
        "old": null,
        "new": "            }   \n"
      },
      {
        "old": null,
        "new": "\n"
      },
      {
        "old": null,
        "new": "                //TODO: Arbitrary 32 length, maybe calculate maximum value and change?\n"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_INT: {\n"
      },
      {
        "old": null,
        "new": "                char str[32];\n"
      },
      {
        "old": null,
        "new": "                int num;\n"
      },
      {
        "old": null,
        "new": "                num = va_arg(vlist, int);\n"
      },
      {
        "old": null,
        "new": "                itoa(str, (unsigned long long) num, &token);\n"
      },
      {
        "old": null,
        "new": "                print(str);\n"
      },
      {
        "old": null,
        "new": "                break;\n"
      },
      {
        "old": "            }\n",
        "new": "            }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            //Print format specifier and carry on\n",
        "new": null
      },
      {
        "old": "            if (!print(format, 2)) {\n",
        "new": null
      },
      {
        "old": "                return -1;\n",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_UINT: {\n"
      },
      {
        "old": null,
        "new": "                char str[32];\n"
      },
      {
        "old": null,
        "new": "                int num;\n"
      },
      {
        "old": null,
        "new": "                num = va_arg(vlist, unsigned int);\n"
      },
      {
        "old": null,
        "new": "                itoa(str, (unsigned long long)  num, &token);\n"
      },
      {
        "old": null,
        "new": "                print(str);\n"
      },
      {
        "old": null,
        "new": "                break;\n"
      },
      {
        "old": "            }\n",
        "new": "            }\n"
      },
      {
        "old": null,
        "new": "        }   \n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "            written += 2;\n",
        "new": null
      },
      {
        "old": "            format += 2;\n",
        "new": null
      },
      {
        "old": "        }\n",
        "new": null
      },
      {
        "old": null,
        "new": "        fmt += length;\n"
      },
      {
        "old": "    }\n",
        "new": "    }\n"
      },
      {
        "old": "\n",
        "new": "\n"
      },
      {
        "old": "    return written;\n",
        "new": "    return written;\n"
      },
      {
        "old": "}\n",
        "new": "}\n"
      }
    ]
