 module.exports = [
      {
        "old": "#include <stdio.h>",
        "new": "#include <stdio.h>"
      },
      {
        "old": "#include <stdint.h>",
        "new": "#include <stdint.h>"
      },
      {
        "old": "#include <limits.h>",
        "new": "#include <limits.h>"
      },
      {
        "old": "#include <stdbool.h>",
        "new": "#include <stdbool.h>"
      },
      {
        "old": "#include <stdio.h>",
        "new": "#include <stdio.h>"
      },
      {
        "old": "#include <string.h>",
        "new": "#include <string.h>"
      },
      {
        "old": null,
        "new": "#include <ctype.h>"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "enum format_type {",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_NONE, // Just a string part",
        "new": null
      },
      {
        "old": "    FORMAT_TYPE_WIDTH,",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_CHAR,",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_STR,",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_PERCENT_CHAR,",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_INVALID,",
        "new": null
      },
      {
        "old": "\tFORMAT_TYPE_INT",
        "new": null
      },
      {
        "old": "};",
        "new": null
      },
      {
        "old": null,
        "new": "#define ONE_OF(val, ...) \\"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "//Whether the number is of a signed type"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_SIGNED      1 << 0"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "//Left-justifies the conversion within the field"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_LEFT        1 << 1"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "//Prefixes positive numbers with a '+'"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_PLUS        1 << 2 "
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_SPACE       1 << 3 "
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_ALTERNATIVE 1 << 4 "
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "//Number is padded to field width with 0s"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_ZERO        1 << 5 "
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "//Formats with lowercase chars, as opposed to uppercase (for hex, INFINITY, NAN)"
      },
      {
        "old": null,
        "new": "#define TOKEN_FLAG_LOWER       1 << 6"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "#define FIELD_WIDTH_MAX ((1 << 23) - 1)",
        "new": null
      },
      {
        "old": null,
        "new": "enum token_type {"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_INVALID,"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "#define NUMBER_FLAG_SIGN    1 << 0",
        "new": null
      },
      {
        "old": "#define NUMBER_FLAG_ZEROPAD 1 << 1",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: remove"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_TEST,"
      },
      {
        "old": null,
        "new": "    //Plain string, no vararg"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_TEXT,"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "struct printf_spec {",
        "new": null
      },
      {
        "old": "    enum format_type type:8;",
        "new": null
      },
      {
        "old": "    uint8_t base:8;",
        "new": null
      },
      {
        "old": "    int32_t field_width:24;",
        "new": null
      },
      {
        "old": "    uint8_t number_flags:8;",
        "new": null
      },
      {
        "old": "} __packed;",
        "new": null
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_STR,"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_CHAR,"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "static bool print(const char* data, size_t length) {",
        "new": null
      },
      {
        "old": "    const unsigned char* bytes = (const unsigned char*) data;",
        "new": null
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_INT,"
      },
      {
        "old": null,
        "new": "    TOKEN_TYPE_UINT,"
      },
      {
        "old": null,
        "new": "};"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "struct format_token {"
      },
      {
        "old": null,
        "new": "    uint8_t type;"
      },
      {
        "old": null,
        "new": "    uint8_t flags;  "
      },
      {
        "old": null,
        "new": "    uint8_t base;"
      },
      {
        "old": null,
        "new": "    unsigned int width;"
      },
      {
        "old": null,
        "new": "};"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "static bool print_len(const char *data, size_t length) {"
      },
      {
        "old": "    for (size_t i = 0; i < length; ++i) {",
        "new": "    for (size_t i = 0; i < length; ++i) {"
      },
      {
        "old": "        if (putchar(bytes[i]) == EOF) {",
        "new": null
      },
      {
        "old": null,
        "new": "        if (putchar(data[i]) == EOF) {"
      },
      {
        "old": "            return false;",
        "new": "            return false;"
      },
      {
        "old": "        }",
        "new": "        }"
      },
      {
        "old": "    }",
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    return true;",
        "new": "    return true;"
      },
      {
        "old": "}",
        "new": "}"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "static size_t itoa(char* out_num, int num, struct printf_spec spec) {",
        "new": null
      },
      {
        "old": null,
        "new": "static bool print(const char *data) {"
      },
      {
        "old": null,
        "new": "    return print_len(data, strlen(data));"
      },
      {
        "old": null,
        "new": "}"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "static size_t itoa(char *out_num, unsigned long long num, struct format_token *token) {"
      },
      {
        "old": "    size_t len = 0;",
        "new": "    size_t len = 0;"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    bool add_sign = false;",
        "new": null
      },
      {
        "old": "    if (num < 0 && spec.number_flags & NUMBER_FLAG_SIGN) {",
        "new": null
      },
      {
        "old": "        num *= -1;",
        "new": null
      },
      {
        "old": "        add_sign = true;",
        "new": null
      },
      {
        "old": null,
        "new": "    char *p = out_num;"
      },
      {
        "old": null,
        "new": "    if (token->flags & TOKEN_FLAG_SIGNED && ((signed) len) < 0) {"
      },
      {
        "old": null,
        "new": "        *p++ = '-';"
      },
      {
        "old": null,
        "new": "        num = ((signed) num) * -1;"
      },
      {
        "old": "    }",
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    //outputs edx hex in reverse order into tmp",
        "new": null
      },
      {
        "old": "    while (num != 0) {",
        "new": null
      },
      {
        "old": "        int remainder = num % spec.base;",
        "new": null
      },
      {
        "old": "        if (remainder < 10) {",
        "new": null
      },
      {
        "old": "            out_num[len] = remainder + '0';",
        "new": null
      },
      {
        "old": null,
        "new": "    //Get to where the number ends;"
      },
      {
        "old": null,
        "new": "    unsigned long long shifter = num;"
      },
      {
        "old": null,
        "new": "    unsigned int digits = 0;"
      },
      {
        "old": null,
        "new": "    unsigned int filler_chars = 0;"
      },
      {
        "old": null,
        "new": "    do {"
      },
      {
        "old": null,
        "new": "        ++p;"
      },
      {
        "old": null,
        "new": "        ++digits;"
      },
      {
        "old": null,
        "new": "        if (shifter) {"
      },
      {
        "old": null,
        "new": "            shifter /= token->base;"
      },
      {
        "old": "        } else {",
        "new": "        } else {"
      },
      {
        "old": "            out_num[len] = remainder + 'A' - 10;",
        "new": null
      },
      {
        "old": null,
        "new": "            ++filler_chars;"
      },
      {
        "old": "        }",
        "new": "        }"
      },
      {
        "old": null,
        "new": "    } while (shifter || digits < token->width);"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "        num /= spec.base;",
        "new": null
      },
      {
        "old": "        ++len;",
        "new": null
      },
      {
        "old": "    } ",
        "new": null
      },
      {
        "old": null,
        "new": "    *p = '\\0';"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    if (add_sign) {",
        "new": null
      },
      {
        "old": "        out_num[len] = '-';",
        "new": null
      },
      {
        "old": "        ++len;",
        "new": null
      },
      {
        "old": "    }",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: Right justifcation"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "    do {"
      },
      {
        "old": null,
        "new": "        //gets stuck"
      },
      {
        "old": null,
        "new": "        int val = num % token->base;"
      },
      {
        "old": null,
        "new": "        if (val < 10) {"
      },
      {
        "old": null,
        "new": "            *(--p) = '0' + val;"
      },
      {
        "old": null,
        "new": "        } else {"
      },
      {
        "old": null,
        "new": "            *(--p) = ((token->flags & TOKEN_FLAG_LOWER) ? 'a' : 'A') + val - 10;"
      },
      {
        "old": null,
        "new": "        }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    //Reverse out_num to get it into the correct order",
        "new": null
      },
      {
        "old": "    char *p1, *p2;",
        "new": null
      },
      {
        "old": "    ",
        "new": null
      },
      {
        "old": "    p1 = out_num;",
        "new": null
      },
      {
        "old": "    p2 = out_num + (len - 1);",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "    while (p1 < p2) {",
        "new": null
      },
      {
        "old": "        char tmp = *p1;",
        "new": null
      },
      {
        "old": "        *p1 = *p2;",
        "new": null
      },
      {
        "old": "        *p2 = tmp;",
        "new": null
      },
      {
        "old": "        ++p1;",
        "new": null
      },
      {
        "old": "        --p2;",
        "new": null
      },
      {
        "old": null,
        "new": "        "
      },
      {
        "old": null,
        "new": "        num /= token->base;"
      },
      {
        "old": null,
        "new": "    } while (num);"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "    //Add preceeding 0s or spaces"
      },
      {
        "old": null,
        "new": "    for (int i = 0; i < filler_chars; ++i) {"
      },
      {
        "old": null,
        "new": "        *(--p) = (token->flags & TOKEN_FLAG_ZERO) ? '0' : ' ';"
      },
      {
        "old": "    }",
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    return len;",
        "new": "    return len;"
      },
      {
        "old": "}",
        "new": "}"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "int vprintf(const char* format, va_list vlist) {",
        "new": null
      },
      {
        "old": "    struct printf_spec spec = {0};",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "    int written = 0;",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "    while(*format != '\\0') {",
        "new": null
      },
      {
        "old": "        size_t max_remain = INT_MAX - written;",
        "new": null
      },
      {
        "old": null,
        "new": "static size_t atoi(const char *fmt, unsigned int *num) {"
      },
      {
        "old": null,
        "new": "    size_t len = 0;"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "        if (format[0] == '%' && format[1] == '%') {",
        "new": null
      },
      {
        "old": "            ++format;",
        "new": null
      },
      {
        "old": "        }",
        "new": null
      },
      {
        "old": null,
        "new": "    while (isdigit(*fmt)) {"
      },
      {
        "old": null,
        "new": "        *num = *num * 10 + (*fmt - '0');        "
      },
      {
        "old": null,
        "new": "        ++len;"
      },
      {
        "old": null,
        "new": "        ++fmt;"
      },
      {
        "old": null,
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "        //if the next character is not a format token, write until the next % or until the end",
        "new": null
      },
      {
        "old": "        if (format[0] != '%' || format[1] == '%') {",
        "new": null
      },
      {
        "old": "            if (format[0] == '%') {",
        "new": null
      },
      {
        "old": "                ++format;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "    return len;"
      },
      {
        "old": null,
        "new": "}"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            size_t amount = 1;",
        "new": null
      },
      {
        "old": "            while (format[amount] && format[amount] != '%') {",
        "new": null
      },
      {
        "old": "                ++amount;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "static int process_token(const char *fmt, va_list vlist, struct format_token *token) {"
      },
      {
        "old": null,
        "new": "    const char *start = fmt;"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (amount > max_remain) {",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "    for (; *fmt && *fmt != '%'; fmt++);"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (!print(format, amount)) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "    if (fmt != start) {"
      },
      {
        "old": null,
        "new": "        token->type = TOKEN_TYPE_TEXT;"
      },
      {
        "old": null,
        "new": "        return fmt - start;"
      },
      {
        "old": null,
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            format += amount;",
        "new": null
      },
      {
        "old": "            written += amount;",
        "new": null
      },
      {
        "old": "            continue;",
        "new": null
      },
      {
        "old": null,
        "new": "    ++fmt;"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "    bool at_flags = true;"
      },
      {
        "old": null,
        "new": "    while (at_flags) {"
      },
      {
        "old": null,
        "new": "        switch (*fmt) {"
      },
      {
        "old": null,
        "new": "            case '-': token->flags |= TOKEN_FLAG_LEFT; break;"
      },
      {
        "old": null,
        "new": "            case '+': token->flags |= TOKEN_FLAG_PLUS; break;"
      },
      {
        "old": null,
        "new": "            case ' ': token->flags |= TOKEN_FLAG_SPACE; break;"
      },
      {
        "old": null,
        "new": "            case '#': token->flags |= TOKEN_FLAG_ALTERNATIVE; break;"
      },
      {
        "old": null,
        "new": "            case '0': token->flags |= TOKEN_FLAG_ZERO; break;"
      },
      {
        "old": null,
        "new": "            default:"
      },
      {
        "old": null,
        "new": "                      at_flags = false;"
      },
      {
        "old": null,
        "new": "                      break;"
      },
      {
        "old": "        }",
        "new": "        }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "        const char next = *(format + 1);",
        "new": null
      },
      {
        "old": "        //check the next character for the format specifier",
        "new": null
      },
      {
        "old": "        if (next == 'c') {",
        "new": null
      },
      {
        "old": "            format += 2;",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "            char c = (char) va_arg(vlist, int /* char promotes to int in parameters */);",
        "new": null
      },
      {
        "old": "            if (max_remain == 0) {",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "            if (!print(&c, sizeof(c))) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "            ++written;",
        "new": null
      },
      {
        "old": "        } else if (next == 's') {",
        "new": null
      },
      {
        "old": "            format += 2;",
        "new": null
      },
      {
        "old": "            const char* str = va_arg(vlist, const char*);",
        "new": null
      },
      {
        "old": "            size_t len = strlen(str);",
        "new": null
      },
      {
        "old": "",
        "new": null
      },
      {
        "old": "            if (len > max_remain) {",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "        if (at_flags) {"
      },
      {
        "old": null,
        "new": "            ++fmt;"
      },
      {
        "old": null,
        "new": "        }"
      },
      {
        "old": null,
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (!print(str, len)) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "    if (isdigit(*fmt)) {"
      },
      {
        "old": null,
        "new": "        unsigned int width = 0;"
      },
      {
        "old": null,
        "new": "        fmt += atoi(fmt, &width);"
      },
      {
        "old": null,
        "new": "        token->width = width;"
      },
      {
        "old": null,
        "new": "    } else if (*fmt == '*') {"
      },
      {
        "old": null,
        "new": "        token->width = va_arg(vlist, unsigned int);"
      },
      {
        "old": null,
        "new": "        ++fmt; "
      },
      {
        "old": null,
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            written += len;",
        "new": null
      },
      {
        "old": "        } else if (next == 'd') {",
        "new": null
      },
      {
        "old": "            format += 2;",
        "new": null
      },
      {
        "old": "            int number = va_arg(vlist, int);",
        "new": null
      },
      {
        "old": null,
        "new": "    //TODO: Precision"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "    //TODO: Length modifiers"
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "    switch (*fmt) {"
      },
      {
        "old": null,
        "new": "        case 'd':"
      },
      {
        "old": null,
        "new": "        case 'i': "
      },
      {
        "old": null,
        "new": "            token->base = 10;"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_INT;            "
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        case 'o':"
      },
      {
        "old": null,
        "new": "            token->base = 8;"
      },
      {
        "old": null,
        "new": "        case 'u':"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_UINT;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        case 'x':"
      },
      {
        "old": null,
        "new": "            token->flags |= TOKEN_FLAG_LOWER;"
      },
      {
        "old": null,
        "new": "        case 'X':"
      },
      {
        "old": null,
        "new": "            token->base = 16;"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_UINT;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        case 'c':"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_CHAR;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        case 's':"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_STR;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        case '%':"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_TEXT;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "        default:"
      },
      {
        "old": null,
        "new": "            token->type = TOKEN_TYPE_INVALID;"
      },
      {
        "old": null,
        "new": "            break;"
      },
      {
        "old": null,
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            spec.base = 10;",
        "new": null
      },
      {
        "old": "            spec.number_flags |= NUMBER_FLAG_SIGN;",
        "new": null
      },
      {
        "old": "            char str[12];",
        "new": null
      },
      {
        "old": "            size_t len = itoa(str, number, spec);",
        "new": null
      },
      {
        "old": null,
        "new": "    return ++fmt - start;"
      },
      {
        "old": null,
        "new": "}"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (len > max_remain) {",
        "new": null
      },
      {
        "old": "                //TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (!print(str, len)) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "int vprintf(const char *fmt, va_list vlist) {"
      },
      {
        "old": null,
        "new": "    size_t written = 0;"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            written += len;",
        "new": null
      },
      {
        "old": null,
        "new": "    while (*fmt != '\\0') {"
      },
      {
        "old": null,
        "new": "        struct format_token token = {0}; "
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "        } else if (next == 'x') {",
        "new": null
      },
      {
        "old": "            format += 2;",
        "new": null
      },
      {
        "old": "            int number = va_arg(vlist, int);",
        "new": null
      },
      {
        "old": null,
        "new": "        size_t length = process_token(fmt, vlist, &token);"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            spec.base = 16;",
        "new": null
      },
      {
        "old": "            spec.number_flags &= ~(NUMBER_FLAG_SIGN);",
        "new": null
      },
      {
        "old": "            char str[9];",
        "new": null
      },
      {
        "old": "            size_t len = itoa(str, number, spec);",
        "new": null
      },
      {
        "old": null,
        "new": "        switch (token.type) {"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_INVALID:"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_TEXT:"
      },
      {
        "old": null,
        "new": "                if (!print_len(fmt, length)) {"
      },
      {
        "old": null,
        "new": "                    return -1;"
      },
      {
        "old": null,
        "new": "                }"
      },
      {
        "old": null,
        "new": "                break;"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (len > max_remain) {",
        "new": null
      },
      {
        "old": "                //TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": "            }",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_CHAR: {"
      },
      {
        "old": null,
        "new": "                char c;"
      },
      {
        "old": null,
        "new": "                c = (char) va_arg(vlist, int);"
      },
      {
        "old": null,
        "new": "                if (!putchar(c)) {"
      },
      {
        "old": null,
        "new": "                    return -1;"
      },
      {
        "old": null,
        "new": "                }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            if (!print(str, len)) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": null,
        "new": "                break;"
      },
      {
        "old": "            }",
        "new": "            }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            written += len;",
        "new": null
      },
      {
        "old": "        } else {",
        "new": null
      },
      {
        "old": "            if (max_remain < 2) {",
        "new": null
      },
      {
        "old": "                // TODO: Set errno to EOVERFLOW",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_STR: {"
      },
      {
        "old": null,
        "new": "                const char *str;"
      },
      {
        "old": null,
        "new": "                str = va_arg(vlist, const char *);"
      },
      {
        "old": null,
        "new": "                print(str);"
      },
      {
        "old": null,
        "new": "                break;"
      },
      {
        "old": null,
        "new": "            }   "
      },
      {
        "old": null,
        "new": ""
      },
      {
        "old": null,
        "new": "                //TODO: Arbitrary 32 length, maybe calculate maximum value and change?"
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_INT: {"
      },
      {
        "old": null,
        "new": "                char str[32];"
      },
      {
        "old": null,
        "new": "                int num;"
      },
      {
        "old": null,
        "new": "                num = va_arg(vlist, int);"
      },
      {
        "old": null,
        "new": "                itoa(str, (unsigned long long) num, &token);"
      },
      {
        "old": null,
        "new": "                print(str);"
      },
      {
        "old": null,
        "new": "                break;"
      },
      {
        "old": "            }",
        "new": "            }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            //Print format specifier and carry on",
        "new": null
      },
      {
        "old": "            if (!print(format, 2)) {",
        "new": null
      },
      {
        "old": "                return -1;",
        "new": null
      },
      {
        "old": null,
        "new": "            case TOKEN_TYPE_UINT: {"
      },
      {
        "old": null,
        "new": "                char str[32];"
      },
      {
        "old": null,
        "new": "                int num;"
      },
      {
        "old": null,
        "new": "                num = va_arg(vlist, unsigned int);"
      },
      {
        "old": null,
        "new": "                itoa(str, (unsigned long long)  num, &token);"
      },
      {
        "old": null,
        "new": "                print(str);"
      },
      {
        "old": null,
        "new": "                break;"
      },
      {
        "old": "            }",
        "new": "            }"
      },
      {
        "old": null,
        "new": "        }   "
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "            written += 2;",
        "new": null
      },
      {
        "old": "            format += 2;",
        "new": null
      },
      {
        "old": "        }",
        "new": null
      },
      {
        "old": null,
        "new": "        fmt += length;"
      },
      {
        "old": "    }",
        "new": "    }"
      },
      {
        "old": "",
        "new": ""
      },
      {
        "old": "    return written;",
        "new": "    return written;"
      },
      {
        "old": "}",
        "new": "}"
      }
    ]
